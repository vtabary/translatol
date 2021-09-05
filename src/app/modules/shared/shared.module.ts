import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { NotificationComponent } from './components/notification/notification.component';
import { BtoaPipe } from './pipes/btoa/btoa.pipe';
import { EndOfStringPipe } from './pipes/end-of-string/end-of-string.pipe';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';

import { ClarityIcons, copyToClipboardIcon } from '@cds/core/icon';
ClarityIcons.addIcons(copyToClipboardIcon);

@NgModule({
  declarations: [NotificationComponent, CopyToClipboardComponent, BtoaPipe, EndOfStringPipe],
  imports: [CommonModule, ClarityModule],
  exports: [NotificationComponent, CopyToClipboardComponent, BtoaPipe, EndOfStringPipe],
})
export class SharedModule {}
