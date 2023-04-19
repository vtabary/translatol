import * as vscode from 'vscode';
import { TranslatolEditorProvider } from './translatol-editor';

// Called when our extension is activated
export function activate(context: vscode.ExtensionContext) {
  // Register our custom editor providers
  context.subscriptions.push(TranslatolEditorProvider.register(context));
}
