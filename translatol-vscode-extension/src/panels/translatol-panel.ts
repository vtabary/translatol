import { Disposable, Uri, ViewColumn, WebviewPanel, window, workspace } from 'vscode';
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

export type MessageToWebView = XliffLoadMessageToWebView;

/**
 * This class manages the state and behavior of TranslatolPanel webview panels.
 */
export class TranslatolPanel {
  public static panels = new Map<string, TranslatolPanel>();

  private _disposables: Disposable[] = [];

  /**
   * The HelloWorldPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  constructor(private readonly panel: WebviewPanel, extensionUri: Uri, private fileUri: Uri) {
    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this.panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Set the HTML content for the webview panel
    this.panel.webview.html = getWebViewHTML(this.panel.webview, extensionUri);
  }

  public reveal(viewColumn?: ViewColumn, preserveFocus?: boolean): void {
    this.panel.reveal(viewColumn, preserveFocus);
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static async render(extensionUri: Uri, fileUri: Uri) {
    if (TranslatolPanel.panels.has(fileUri.toString())) {
      TranslatolPanel.panels.get(fileUri.toString()).reveal();
      return;
    }

    // If a webview panel does not already exist create and show a new one
    const panel = window.createWebviewPanel(
      // Panel view type
      'translatolEditorPanel',
      // Panel title
      fileUri.toString().split('/').at(-1),
      // The editor column the panel should be displayed in
      ViewColumn.Active,
      // Extra panel configurations
      {
        // Enable JavaScript in the webview
        enableScripts: true,
        // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
        localResourceRoots: [
          Uri.joinPath(extensionUri, 'translatol-vscode-webview') /* , Uri.joinPath(extensionUri, 'webview-ui/build') */,
        ],
        retainContextWhenHidden: true,
      }
    );

    const templateFileUri = Uri.joinPath(fileUri, '..', 'messages.xlf');
    const message: XliffLoadMessageToWebView = {
      type: 'xliff_load',
      file: {
        path: fileUri.toString(),
        content: await getFileContent(fileUri),
      },
      template: {
        path: templateFileUri.toString(),
        content: await getFileContent(templateFileUri),
      },
    };
    panel.webview.postMessage(message as MessageToWebView);

    panel.webview.onDidReceiveMessage(message => {
      if (message.type === 'xliff_write') {
        writeFileContent(fileUri, message.file.content);
      }
    });

    this.panels.set(fileUri.toString(), new TranslatolPanel(panel, extensionUri, fileUri));
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    TranslatolPanel.panels.delete(this.fileUri.toString());

    // Dispose of the current webview panel
    this.panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }
}
