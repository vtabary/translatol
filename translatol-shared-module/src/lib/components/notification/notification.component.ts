import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  public notification$ = this.notificationService.obs();

  constructor(private notificationService: NotificationService) {}

  public onClose(): void {
    this.notificationService.delete();
  }
}
