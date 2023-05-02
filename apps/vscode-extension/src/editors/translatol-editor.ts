import * as vscode from 'vscode';
import { getWebViewHTML } from '../utils/get-web-view-html';

export class TranslatolEditorProvider implements vscode.CustomTextEditorProvider {
  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new TranslatolEditorProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(TranslatolEditorProvider.viewType, provider);
    return providerRegistration;
  }

  private static readonly viewType = 'translatol.xlf';

  constructor(private readonly context: vscode.ExtensionContext) {}

  /**
   * Called when our custom editor is opened.
   */
  public async resolveCustomTextEditor(
    document: vscode.TextDocument,
    webviewPanel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): Promise<void> {
    // Setup initial content for the webview
    webviewPanel.webview.options = {
      enableScripts: true,
    };
    webviewPanel.webview.html = getWebViewHTML(webviewPanel.webview, this.context.extensionUri);

    console.log('setup updateWebview');
    function updateWebview() {
      console.log('updateWebview', document.getText());

      webviewPanel.webview.postMessage({
        type: 'update',
        text: document.getText(),
      });
    }

    // Hook up event handlers so that we can synchronize the webview with the text document.
    //
    // The text document acts as our model, so we have to sync change in the document to our
    // editor and sync changes in the editor back to the document.
    //
    // Remember that a single text document can also be shared between multiple custom
    // editors (this happens for example when you split a custom editor)

    const changeDocumentSubscription = vscode.workspace.onDidChangeTextDocument(e => {
      if (e.document.uri.toString() === document.uri.toString()) {
        updateWebview();
      }
    });

    // Make sure we get rid of the listener when our editor is closed.
    webviewPanel.onDidDispose(() => {
      changeDocumentSubscription.dispose();
    });

    // Receive message from the webview.
    webviewPanel.webview.onDidReceiveMessage(event => {
      console.log('Receive message from the webview', event);
    });

    updateWebview();
  }
}
