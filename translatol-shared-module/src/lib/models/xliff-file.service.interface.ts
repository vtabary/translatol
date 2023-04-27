import { InjectionToken } from '@angular/core';
import { IXliff } from '@vtabary/xliff2js';
import { Observable } from 'rxjs';

export interface XLIFFFileHandlerInterface {
  openXLIFF(path: string): Observable<IXliff | undefined>;
  saveXLIFF(path: string, content: IXliff): Observable<void>;
}

export const XLIFF_FILE_HANDLER = new InjectionToken<XLIFFFileHandlerInterface>('XLIFF_FILE_SERVICE');
