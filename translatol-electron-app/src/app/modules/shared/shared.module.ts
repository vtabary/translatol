import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';
import { NotificationComponent } from './components/notification/notification.component';
import { BtoaPipe } from './pipes/btoa/btoa.pipe';

import { ClarityIcons, copyToClipboardIcon } from '@cds/core/icon';
import { TranslatolSharedModule } from 'translatol-shared-module';
ClarityIcons.addIcons(copyToClipboardIcon);

@NgModule({
  declarations: [NotificationComponent, CopyToClipboardComponent, BtoaPipe],
  imports: [CommonModule, ClarityModule, TranslatolSharedModule],
  exports: [NotificationComponent, CopyToClipboardComponent, BtoaPipe],
})
export class SharedModule {}
