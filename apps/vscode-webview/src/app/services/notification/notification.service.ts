import { Injectable } from '@angular/core';
import { NotificationServiceInterface } from '@translatol/shared-module';
import { PostMessageService } from '../post-message/post-message.service';

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
  constructor(private postMessageService: PostMessageService) {}

  public showInformation(message: string): void {
    this.postMessageService.sendMessage({
      type: 'notification',
      level: 'info',
      message,
    });
  }
  public showWarning(message: string): void {
    this.postMessageService.sendMessage({
      type: 'notification',
      level: 'warning',
      message,
    });
  }
  public showError(message: string): void {
    this.postMessageService.sendMessage({
      type: 'notification',
      level: 'error',
      message,
    });
  }
}
