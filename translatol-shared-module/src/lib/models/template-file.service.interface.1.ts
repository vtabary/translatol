import { InjectionToken } from '@angular/core';

export interface TemplateFileHandlerInterface {
  getTemplatePath(path: string): string;
}

export const TEMPLATE_FILE_HANDLER = new InjectionToken<TemplateFileHandlerInterface>('XLIFF_FILE_SERVICE');
