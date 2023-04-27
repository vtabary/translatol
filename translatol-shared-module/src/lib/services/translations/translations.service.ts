import { Inject, Injectable } from '@angular/core';
import { IXliff, IXliffBody, IXliffFile, IXliffTransUnit } from '@vtabary/xliff2js';
import { cloneDeep } from 'lodash';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TEMPLATE_FILE_HANDLER, TemplateFileHandlerInterface } from '../../models/template-file.service.interface.1';
import { XLIFFFileHandlerInterface, XLIFF_FILE_HANDLER } from '../../models/xliff-file.service.interface';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  constructor(
    @Inject(TEMPLATE_FILE_HANDLER)
    private templateFileService: TemplateFileHandlerInterface,
    @Inject(XLIFF_FILE_HANDLER)
    private xliffFileService: XLIFFFileHandlerInterface
  ) {}

  public load(filePath: string, templateFilePath?: string): Observable<{ locale: IXliff; duplicated: IXliffTransUnit[] }> {
    templateFilePath = templateFilePath || this.getTemplatePathFrom(filePath);

    return forkJoin([
      this.xliffFileService.openXLIFF(templateFilePath).pipe(catchError(() => of(undefined))),
      this.xliffFileService.openXLIFF(filePath),
    ]).pipe(map(translations => this.merge(translations[0], translations[1])));
  }

  public merge(template: IXliff, current: IXliff): { locale: IXliff; duplicated: IXliffTransUnit[] } {
    const currentTranslations = this.getAllTranslations(current);
    const duplicated = this.getDuplicated(currentTranslations);

    if (!template) {
      return { locale: current, duplicated };
    }

    const clone: IXliff = cloneDeep(template);
    // Transfer all target language from the current translation file to the clone
    clone.children.forEach((cloneFile, index) => (cloneFile.$['target-language'] = current.children[index].$['target-language']));

    const templateTranslations = this.getAllTranslations(clone);

    templateTranslations.forEach(translation => {
      const translated = this.getTranslation(translation.$.id, currentTranslations);
      this.copyTarget(translated, translation);
    });

    return { locale: clone, duplicated };
  }

  public getAllTranslations(locale: IXliff): IXliffTransUnit[] {
    if (!locale) {
      return [];
    }

    return locale.children.map(child => this.getAllFileTranslations(child)).reduce((prev, curr) => prev.concat(curr), []);
  }

  private getAllFileTranslations(file: IXliffFile): IXliffTransUnit[] {
    if (!file) {
      return [];
    }

    return file.children.map(child => this.getAllBodyTranslations(child)).reduce((prev, curr) => prev.concat(curr), []);
  }

  private getAllBodyTranslations(body: IXliffBody): IXliffTransUnit[] {
    if (!body) {
      return;
    }

    return body.children;
  }

  private getTranslation(id: string, translations: IXliffTransUnit[]): IXliffTransUnit | undefined {
    return (translations || []).find(translation => translation.$.id === id);
  }

  private copyTarget(from: IXliffTransUnit, to: IXliffTransUnit) {
    if (!from || !from.children || !to) {
      return;
    }

    to.children = to.children.concat(from.children.filter(child => child.name === 'target'));
  }

  private getTemplatePathFrom(filePath: string): string {
    return this.templateFileService.getTemplatePath(filePath);
  }

  private getDuplicated(currentTranslations: IXliffTransUnit[]): IXliffTransUnit[] {
    const keys = new Set();
    const duplicated: Record<string, IXliffTransUnit> = {};
    currentTranslations.forEach(translation => {
      if (keys.has(translation.$.id)) {
        duplicated[translation.$.id] = translation;
      }
      keys.add(translation.$.id);
    });
    return Object.values(duplicated);
  }
}
