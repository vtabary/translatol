import { Disposable, Uri, ViewColumn, Webview, WebviewPanel, window, workspace } from 'vscode';
import { getNonce } from '../util';

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

/**
 * This class manages the state and behavior of HelloWorld webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering HelloWorld webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 * - Setting message listeners so data can be passed between the webview and extension
 */
export class TranslatolPanel {
  public static currentPanel: TranslatolPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  /**
   * The HelloWorldPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Set the HTML content for the webview panel
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static async render(extensionUri: Uri, fileUri: Uri) {
    if (TranslatolPanel.currentPanel) {
      // If the webview panel already exists reveal it
      TranslatolPanel.currentPanel._panel.reveal(ViewColumn.Active);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = window.createWebviewPanel(
        // Panel view type
        'translatolEditorPanel',
        // Panel title
        fileUri.toString(),
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
        }
      );

      const templateFileUri = Uri.joinPath(fileUri, '..', 'messages.xlf');
      panel.webview.postMessage({
        type: 'xliff_load',
        file: {
          path: fileUri.toString(),
          content: await getFileContent(fileUri),
        },
        template: {
          path: templateFileUri.toString(),
          content: await getFileContent(templateFileUri),
        },
      });

      panel.webview.onDidReceiveMessage(message => {
        if (message.type === 'xliff_write') {
          writeFileContent(fileUri, message.file.content);
        }
      });

      TranslatolPanel.currentPanel = new TranslatolPanel(panel, extensionUri);
    }
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    TranslatolPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the Angular webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    // Local path to script and css for the webview
    const angularCSSURI = webview.asWebviewUri(Uri.joinPath(extensionUri, 'translatol-vscode-webview', 'styles.css'));
    const angularRuntimeURI = webview.asWebviewUri(Uri.joinPath(extensionUri, 'translatol-vscode-webview', 'runtime.js'));
    const angularPolyfillsURI = webview.asWebviewUri(Uri.joinPath(extensionUri, 'translatol-vscode-webview', 'polyfills.js'));
    const angularMainURI = webview.asWebviewUri(Uri.joinPath(extensionUri, 'translatol-vscode-webview', 'main.js'));

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <!--
		Use a content security policy to only allow loading images from https or from our extension directory,
		and only allow scripts that have a specific nonce.
		-->
    <!--
		<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src ${webview.cspSource}; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
    -->
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${angularCSSURI}">
  </head>
  <body>
    <app-root></app-root>
    <script src="${angularRuntimeURI}" type="module"></script>
    <script src="${angularPolyfillsURI}" type="module"></script>
    <script src="${angularMainURI}" type="module"></script>
  </body>
</html>
    `;
  }
}
