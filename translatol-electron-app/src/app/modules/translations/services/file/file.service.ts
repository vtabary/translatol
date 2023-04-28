import { Injectable } from '@angular/core';
import { IXliff, XliffBuilder, XliffParser } from '@vtabary/xliff2js';
import type fs from 'node:fs';
import { Observable, of, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { XLIFFWritingInterface } from 'translatol-shared-module';
import { ElectronService } from '../../../shared/public-api';

@Injectable({
  providedIn: 'root',
})
export class FileService implements XLIFFWritingInterface {
  constructor(private electron: ElectronService) {}

  public open(filePath: string): Observable<string> {
    if (!this.electron.isElectron) {
      return throwError(new Error('Can not open file outside an Electron application'));
    }

    const fs = this.fs();
    if (!fs.existsSync(filePath)) {
      return throwError(new Error('File ' + filePath + ' does not exist.'));
    }

    return of(fs.readFileSync(filePath, { encoding: 'utf8' }));
  }

  public openXLIFF(filePath: string): Observable<IXliff | undefined> {
    if (!this.electron.isElectron) {
      return throwError(new Error('Can not open file outside an Electron application'));
    }

    return this.open(filePath).pipe(
      switchMap(data => {
        const parser = new XliffParser();
        return of(parser.parse<IXliff>(data));
      })
    );
  }

  public save(filePath: string, data: string): Observable<void> {
    if (!this.electron.isElectron) {
      return throwError(new Error('Can not save file outside an Electron application'));
    }

    const fs = this.fs();
    return of(fs.writeFileSync(filePath, data, { encoding: 'utf8' }));
  }

  public saveXLIFF(filePath: string, data: IXliff): Observable<void> {
    if (!this.electron.isElectron) {
      return throwError(new Error('Can not open file outside an Electron application'));
    }

    const builder = new XliffBuilder({ pretty: true });
    const xml = builder.build(data);
    return this.save(filePath, xml);
  }

  private fs(): typeof fs {
    return this.electron.remote.require('fs');
  }
}
