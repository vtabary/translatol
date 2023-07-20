import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import {
  NOTIFICATION_SERVICE,
  TranslatolSharedModule,
} from '@translatol/shared-module';
import { BtoaPipe } from './pipes/btoa/btoa.pipe';
import { NotificationComponent } from './components/notification/notification.component';
import { NotificationService } from './services/notification/notification.service';

@NgModule({
  declarations: [BtoaPipe, NotificationComponent],
  imports: [CommonModule, ClarityModule, TranslatolSharedModule],
  exports: [BtoaPipe, NotificationComponent],
  providers: [
    { provide: NOTIFICATION_SERVICE, useExisting: NotificationService },
  ],
})
export class SharedModule {}
