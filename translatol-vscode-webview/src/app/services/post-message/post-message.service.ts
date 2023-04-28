import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ResolvedXLIFF } from 'translatol-shared-module';

declare global {
  function acquireVsCodeApi(): {
    postMessage(message: unknown): void;
  };
}

export interface XliffWriteMessage {
  type: 'xliff_write';
  file: { path: string; content: string };
}

export interface NotificationMessage {
  type: 'notification';
  level: 'info' | 'warning' | 'error';
  message: string;
}

export type MessageToExtension = XliffWriteMessage | NotificationMessage;

@Injectable({
  providedIn: 'root',
})
export class PostMessageService {
  private vscode = acquireVsCodeApi();

  public onMessageReceive = fromEvent<MessageEvent<ResolvedXLIFF>>(globalThis, 'message').pipe(
    map(event => event.data),
    shareReplay(1)
  );

  public sendMessage(message: MessageToExtension): void {
    this.vscode.postMessage(message);
  }
}
