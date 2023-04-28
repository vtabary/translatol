import * as vscode from 'vscode';
import { OpenTranslateViewCommand } from './commands/open-translate-view';

// Called when our extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  // context.subscriptions.push(TranslatolEditorProvider.register(context));
  context.subscriptions.push(OpenTranslateViewCommand.register(context));
}
