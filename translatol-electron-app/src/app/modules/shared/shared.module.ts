import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { TranslatolSharedModule } from 'translatol-shared-module';
import { BtoaPipe } from './pipes/btoa/btoa.pipe';

@NgModule({
  declarations: [BtoaPipe],
  imports: [CommonModule, ClarityModule, TranslatolSharedModule],
  exports: [BtoaPipe],
})
export class SharedModule {}
