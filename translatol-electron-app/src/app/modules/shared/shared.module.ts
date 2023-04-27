import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';
import { BtoaPipe } from './pipes/btoa/btoa.pipe';

import { ClarityIcons, copyToClipboardIcon } from '@cds/core/icon';
import { TranslatolSharedModule } from 'translatol-shared-module';
ClarityIcons.addIcons(copyToClipboardIcon);

@NgModule({
  declarations: [CopyToClipboardComponent, BtoaPipe],
  imports: [CommonModule, ClarityModule, TranslatolSharedModule],
  exports: [CopyToClipboardComponent, BtoaPipe],
})
export class SharedModule {}
