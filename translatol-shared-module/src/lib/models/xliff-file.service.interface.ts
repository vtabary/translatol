import { InjectionToken } from '@angular/core';
import { IXliff } from '@vtabary/xliff2js';

export interface XLIFFWritingInterface {
  saveXLIFF(path: string, content: IXliff): void;
}

export const XLIFF_WRITING_SERVICE = new InjectionToken<XLIFFWritingInterface>('XLIFF_WRITING');
