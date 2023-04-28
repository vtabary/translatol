import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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
  private notify$ = new BehaviorSubject<INotification>(null);

  public obs(): Observable<INotification> {
    return this.notify$.asObservable();
  }

  public delete(): void {
    this.notify$.next(null);
  }

  public info(notification: IMessage): void {
    this.send(Object.assign({ type: INotificationType.INFO }, notification));
  }

  public success(notification: IMessage): void {
    this.send(Object.assign({ type: INotificationType.SUCCESS }, notification));
  }

  public warn(notification: IMessage): void {
    this.send(Object.assign({ type: INotificationType.WARNING }, notification));
  }

  public error(notification: IMessage): void {
    this.send(Object.assign({ type: INotificationType.ERROR }, notification));
  }

  private send(notification: INotification): void {
    this.notify$.next(notification);
  }
}
