import { Injectable } from '@angular/core';
import path from 'node:path';
import { ElectronService } from '../../../shared/public-api';

@Injectable({
  providedIn: 'root',
})
export class PathService {
  constructor(private electron: ElectronService) {}
  public getTemplatePath(filePath: string): string {
    const path = this.path();
    return path.join(path.dirname(filePath), 'messages.xlf');
  }

  private path(): typeof path {
    return this.electron.remote.require('path');
  }
}
