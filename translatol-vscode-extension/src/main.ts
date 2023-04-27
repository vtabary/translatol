import * as vscode from 'vscode';
import { TranslatolEditorProvider } from './editors/translatol-editor';
import { ShowPreviewCommand } from './commands/open-translate-view';

// Called when our extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(TranslatolEditorProvider.register(context));
  context.subscriptions.push(ShowPreviewCommand.register(context));
}
