import { Uri, Webview } from 'vscode';
import { getNonce } from './get-nonce';

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
export function getWebViewHTML(webview: Webview, extensionUri: Uri) {
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
