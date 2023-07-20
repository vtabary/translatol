import { InjectionToken } from '@angular/core';

export interface NotificationServiceInterface {
  showInformation: (message: string) => void;
  showWarning: (message: string) => void;
  showError: (message: string) => void;
}

export const NOTIFICATION_SERVICE = new InjectionToken<NotificationServiceInterface>('NOTIFICATION_SERVICE');
