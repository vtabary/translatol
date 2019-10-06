import { Component } from '@angular/core';
import { NotificationService, INotification } from 'src/app/services/notification/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  public notification$: Observable<INotification>;

  constructor(
    notificationService: NotificationService
  ) {
    this.notification$ = notificationService.notify;
  }
}
