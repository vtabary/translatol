import { Component } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  public onClose(): void {
    this.notificationService.delete();
  }
}
