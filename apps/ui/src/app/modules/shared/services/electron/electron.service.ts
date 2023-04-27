import { Injectable } from '@angular/core';
// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import type { ipcRenderer, webFrame, clipboard, shell } from 'electron';
import type * as remote from '@electron/remote';
import type * as childProcess from 'child_process';
import type * as fs from 'fs';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  ipcRenderer: typeof ipcRenderer;
  webFrame: typeof webFrame;
  remote: typeof remote;
  childProcess: typeof childProcess;
  fs: typeof fs;
  clipboard: typeof clipboard;
  shell: typeof shell;
  require: typeof remote.require;

  get isElectron(): boolean {
    return !!(window && window.process && window.process.type);
  }

  constructor() {
    // Conditional imports
    if (!this.isElectron) {
      return;
    }

    this.ipcRenderer = window.require('electron').ipcRenderer;
    this.webFrame = window.require('electron').webFrame;
    this.clipboard = window.require('electron').clipboard;
    this.shell = window.require('electron').shell;

    this.childProcess = window.require('child_process');
    this.fs = window.require('fs');

    // If you want to use a NodeJS 3rd party deps in Renderer process (like @electron/remote),
    // it must be declared in dependencies of both package.json (in root and app folders)
    // If you want to use remote object in renderer process, please set enableRemoteModule to true in main.ts
    this.remote = window.require('@electron/remote');
    this.require = this.remote.require;
  }
}
