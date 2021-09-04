import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

export enum INotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'danger',
}

export interface IMessage {
  message: string;
  actions?: {
    action?: () => void;
    label?: string;
  }[];
}

export interface INotification extends IMessage {
  type: INotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notify = new EventEmitter<INotification>();

  public info(notification: IMessage): Observable<void> {
    return this.send(Object.assign({ type: INotificationType.INFO }, notification));
  }

  public success(notification: IMessage): Observable<void> {
    return this.send(Object.assign({ type: INotificationType.SUCCESS }, notification));
  }

  public warn(notification: IMessage): Observable<void> {
    return this.send(Object.assign({ type: INotificationType.WARNING }, notification));
  }

  public error(notification: IMessage): Observable<void> {
    return this.send(Object.assign({ type: INotificationType.ERROR }, notification));
  }

  private send(notification: INotification): Observable<void> {
    return new Observable(obs => {
      this.notify.emit(notification);
      obs.next();
      obs.complete();
    });
  }
}
