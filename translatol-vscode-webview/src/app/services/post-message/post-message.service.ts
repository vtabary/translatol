import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

declare global {
  function acquireVsCodeApi(): {
    postMessage(message: unknown): void;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostMessageService {
  public onMessageReceive = fromEvent<MessageEvent>(globalThis, 'message').pipe(map(event => event.data));

  public sendMessage(message: unknown): void {
    const vscode = acquireVsCodeApi();
    vscode.postMessage(message);
  }
}
