import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { BtoaPipe } from './pipes/btoa/btoa.pipe';

import { ClarityIcons, copyToClipboardIcon } from '@cds/core/icon';
import { TranslatolSharedModule } from 'translatol-shared-module';
ClarityIcons.addIcons(copyToClipboardIcon);

@NgModule({
  declarations: [BtoaPipe],
  imports: [CommonModule, ClarityModule, TranslatolSharedModule],
  exports: [BtoaPipe],
})
export class SharedModule {}
