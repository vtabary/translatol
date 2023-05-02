import {
  Disposable,
  ExtensionContext,
  Uri,
  ViewColumn,
  WebviewPanel,
  window,
  workspace,
} from 'vscode';
import { getWebViewHTML } from '../utils/get-web-view-html';

async function getFileContent(fileUri: Uri): Promise<string> {
  const file = await workspace.fs.readFile(fileUri);
  const content = Buffer.from(file).toString('utf8');

  return content;
}

async function writeFileContent(fileUri: Uri, content: string): Promise<void> {
  try {
    await workspace.fs.writeFile(fileUri, Buffer.from(content, 'utf8'));
  } catch (error) {
    console.log('Error writing file');
  }
}

export interface XliffLoadMessageToWebView {
  type: 'xliff_load';
  file: {
    path: string;
    content: string;
  };
  template: {
    path: string;
    content: string;
  };
}

export interface NotificationMessageFromWebView {
  type: 'notification';
  level: 'info' | 'warning' | 'error';
  message: string;
}

export interface XliffWriteMessageFromWebView {
  type: 'xliff_write';
  file: { path: string; content: string };
}

export type MessageToWebView = XliffLoadMessageToWebView;
export type MessageFromWebView =
  | XliffWriteMessageFromWebView
  | NotificationMessageFromWebView;

/**
 * This class manages the state and behavior of TranslatolPanel webview panels.
 */
export class TranslatolPanel {
  public static panels = new Map<string, TranslatolPanel>();

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static async render(
    context: ExtensionContext,
    fileUri: Uri,
    viewColumn: ViewColumn
  ) {
    if (TranslatolPanel.panels.has(fileUri.toString())) {
      TranslatolPanel.panels.get(fileUri.toString())?.reveal();
      return;
    }

    // If a webview panel does not already exist create and show a new one
    const panel = window.createWebviewPanel(
      // Panel view type
      'translatolEditorPanel',
      // Panel title
      `Translatol: ${fileUri.toString().split('/').at(-1)}`,
      // The editor column the panel should be displayed in
      viewColumn,
      // Extra panel configurations
      {
        // Enable JavaScript in the webview
        enableScripts: true,
        // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
        localResourceRoots: [
          Uri.joinPath(
            context.extensionUri,
            'webview'
          ) /* , Uri.joinPath(extensionUri, 'webview-ui/build') */,
        ],
        retainContextWhenHidden: true,
      }
    );

    this.panels.set(
      fileUri.toString(),
      new TranslatolPanel(panel, context.extensionUri, fileUri)
    );
  }

  private disposables: Disposable[] = [];

  /**
   * The HelloWorldPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  constructor(
    private readonly panel: WebviewPanel,
    extensionUri: Uri,
    private fileUri: Uri
  ) {
    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this.panel.onDidDispose(() => this.dispose(), null, this.disposables);

    // Set the HTML content for the webview panel
    this.panel.webview.html = getWebViewHTML(this.panel.webview, extensionUri);

    this.panel.iconPath = {
      light: Uri.joinPath(
        extensionUri,
        './src/assets/icons/translate-light.svg'
      ),
      dark: Uri.joinPath(extensionUri, './src/assets/icons/translate-dark.svg'),
    };

    this.init();
  }

  public async init(): Promise<void> {
    this.handleMessageFromWebView();
    await this.postFileToWebView();
  }

  public reveal(viewColumn?: ViewColumn, preserveFocus?: boolean): void {
    this.panel.reveal(viewColumn, preserveFocus);
  }

  private handleMessageFromWebView() {
    const disposable = this.panel.webview.onDidReceiveMessage((message) =>
      this.onReceivedMessage(message)
    );

    this.disposables.push(disposable);
  }

  private onReceivedMessage(message: MessageFromWebView) {
    if (message.type === 'xliff_write') {
      writeFileContent(this.fileUri, message.file.content);
    }

    if (message.type === 'notification') {
      this.notify(message);
    }
  }

  private notify(message: NotificationMessageFromWebView) {
    switch (message.level) {
      case 'info':
        window.showInformationMessage(message.message);
        break;
      case 'warning':
        window.showWarningMessage(message.message);
        break;
      case 'error':
        window.showErrorMessage(message.message);
        break;
    }
  }

  private async postFileToWebView() {
    const templateFileUri = Uri.joinPath(this.fileUri, '..', 'messages.xlf');
    const message: XliffLoadMessageToWebView = {
      type: 'xliff_load',
      file: {
        path: this.fileUri.toString(),
        content: await getFileContent(this.fileUri),
      },
      template: {
        path: templateFileUri.toString(),
        content: await getFileContent(templateFileUri),
      },
    };
    this.postMessage(message);
  }

  private postMessage(message: MessageToWebView): void {
    this.panel.webview.postMessage(message);
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    TranslatolPanel.panels.delete(this.fileUri.toString());

    // Dispose of the current webview panel
    this.panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this.disposables.length) {
      const disposable = this.disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
