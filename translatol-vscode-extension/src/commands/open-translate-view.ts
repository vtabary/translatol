/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { TranslatolPanel } from '../panels/translatol-panel';

export class ShowPreviewCommand {
  public static readonly id = 'translatol.OpenTranslateView';

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    context.subscriptions.push();

    const command = new ShowPreviewCommand(context);
    const providerRegistration = vscode.commands.registerCommand(ShowPreviewCommand.id, arg => command.execute(arg));
    return providerRegistration;
  }

  constructor(private context: vscode.ExtensionContext) {}

  public async execute(fileUri?: vscode.Uri) {
    await TranslatolPanel.render(this.context.extensionUri, fileUri);
  }
}
