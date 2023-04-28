import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { NotificationServiceInterface } from 'translatol-shared-module';

export enum INotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'danger',
}

export interface IMessage {
  message: string;
}

export interface INotification extends IMessage {
  type: INotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService implements NotificationServiceInterface {
  private notify$ = new BehaviorSubject<INotification>(null);

  public showInformation(message: string): void {
    this.send({ type: INotificationType.INFO, message });
  }
  public showWarning(message: string): void {
    this.send({ type: INotificationType.WARNING, message });
  }
  public showError(message: string): void {
    this.send({ type: INotificationType.ERROR, message });
  }

  public obs(): Observable<INotification> {
    return this.notify$.asObservable();
  }

  public delete(): void {
    this.notify$.next(null);
  }

  private send(notification: INotification): void {
    this.notify$.next(notification);
  }
}
