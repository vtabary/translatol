import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification, NotificationService } from '../../services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  public notification$: Observable<INotification>;

  constructor(notificationService: NotificationService) {
    this.notification$ = notificationService.notify;
  }
}
