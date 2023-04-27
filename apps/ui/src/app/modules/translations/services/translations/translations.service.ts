import { cloneDeep } from 'lodash';
import { forkJoin, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import type {
  IXliff,
  IXliffTransUnit,
  IXliffFile,
  IXliffBody,
} from '@vtabary/xliff2js';
import { ElectronService } from '../../../shared/public-api';
import { FileService } from '../file/file.service';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  constructor(
    private electron: ElectronService,
    private fileService: FileService
  ) {}

  public load(
    filePath: string,
    templateFilePath?: string
  ): Observable<IXliff | undefined> {
    templateFilePath = templateFilePath || this.getTemplatePathFrom(filePath);

    return forkJoin([
      this.fileService
        .openXLIFF(templateFilePath)
        .pipe(catchError(() => of(undefined))),
      this.fileService.openXLIFF(filePath),
    ]).pipe(
      map((translations) => this.merge(translations[0], translations[1]))
    );
  }

  public merge(
    template: IXliff | undefined,
    current: IXliff | undefined
  ): IXliff | undefined {
    if (!template) {
      return current;
    }

    if (!current) {
      return template;
    }

    const clone: IXliff = cloneDeep(template);
    // Transfer all target language from the current translation file to the clone
    clone.children.forEach(
      (cloneFile, index) =>
        (cloneFile.$['target-language'] =
          current.children[index].$['target-language'])
    );

    const templateTranslations = this.getAllTranslations(clone);
    const currentTranslations = this.getAllTranslations(current);

    templateTranslations.forEach((translation) => {
      const translated = this.getTranslation(
        translation.$.id,
        currentTranslations
      );
      this.copyTarget(translated, translation);
    });

    return clone;
  }

  public getAllTranslations(locale: IXliff): IXliffTransUnit[] {
    if (!locale) {
      return [];
    }

    return locale.children
      .map((child) => this.getAllFileTranslations(child))
      .reduce((prev, curr) => prev.concat(curr), []);
  }

  private getAllFileTranslations(file: IXliffFile): IXliffTransUnit[] {
    if (!file) {
      return [];
    }

    return file.children
      .map((child) => this.getAllBodyTranslations(child))
      .reduce((prev, curr) => prev.concat(curr), []);
  }

  private getAllBodyTranslations(body: IXliffBody): IXliffTransUnit[] {
    if (!body) {
      return [];
    }

    return body.children;
  }

  private getTranslation(
    id: string,
    translations: IXliffTransUnit[]
  ): IXliffTransUnit | undefined {
    return (translations || []).find((translation) => translation.$.id === id);
  }

  private copyTarget(from: IXliffTransUnit | undefined, to: IXliffTransUnit) {
    if (!from || !from.children || !to) {
      return;
    }

    to.children = to.children.concat(
      from.children.filter((child) => child.name === 'target')
    );
  }

  private getTemplatePathFrom(filePath: string): string {
    const path = this.path();
    return path.join(path.dirname(filePath), 'messages.xlf');
  }

  private path(): any {
    return this.electron.remote.require('path');
  }
}
