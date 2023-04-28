import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ResolvedXLIFF } from 'translatol-shared-module';

declare global {
  function acquireVsCodeApi(): {
    postMessage(message: unknown): void;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PostMessageService {
  public onMessageReceive = fromEvent<MessageEvent<ResolvedXLIFF>>(globalThis, 'message').pipe(
    map(event => event.data),
    shareReplay(1)
  );

  public sendMessage(message: unknown): void {
    const vscode = acquireVsCodeApi();
    vscode.postMessage(message);
  }
}
