/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { TranslatolPanel } from '../panels/translatol-panel';
import { Disposable, ExtensionContext, Uri, ViewColumn, commands } from 'vscode';

export class OpenTranslateViewCommand {
  public static readonly openTranslateViewCommandId = 'translatol.OpenTranslateView';
  public static readonly openTranslateViewCommandSidePanelId = 'translatol.OpenTranslateViewSidePanel';

  public static register(context: ExtensionContext): Disposable {
    const openRegistration = commands.registerCommand(OpenTranslateViewCommand.openTranslateViewCommandId, fileUri => {
      const command = new OpenTranslateViewCommand(context);
      command.execute(fileUri, ViewColumn.Active);
    });
    const openSidePanelRegistration = commands.registerCommand(OpenTranslateViewCommand.openTranslateViewCommandSidePanelId, fileUri => {
      const command = new OpenTranslateViewCommand(context);
      command.execute(fileUri, ViewColumn.Beside);
    });
    return new Disposable(() => {
      openRegistration.dispose();
      openSidePanelRegistration.dispose();
    });
  }

  constructor(private context: ExtensionContext) {}

  public async execute(fileUri: Uri, viewColumn: ViewColumn) {
    await TranslatolPanel.render(this.context, fileUri, viewColumn);
  }
}
