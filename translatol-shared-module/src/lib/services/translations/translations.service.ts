import { Injectable } from '@angular/core';
import { IXliff, IXliffBody, IXliffFile, IXliffTransUnit, XliffParser } from '@vtabary/xliff2js';
import { cloneDeep } from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class TranslationsService {
  private $isObsoleteTranslation = false;
  private parser = new XliffParser();

  public get isObsoleteTranslation(): boolean {
    return this.$isObsoleteTranslation;
  }

  public parseXLiff(fileContent: string, templateContent: string): { locale: IXliff; duplicated: IXliffTransUnit[] } {
    const xliffTemplate = this.parser.parse(templateContent);
    const xliffFile = this.parser.parse(fileContent);

    return this.merge(xliffTemplate, xliffFile);
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

    this.handleTranslationObsolete(currentTranslations, templateTranslations);

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

  public filterByTranslatedOperator(translations: IXliffTransUnit[], translated = true): IXliffTransUnit[] {
    return translations.filter(translation => translation.children.some(child => child.name === 'target') === translated);
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

  private handleTranslationObsolete(currentTranslations: IXliffTransUnit[], templateTranslations: IXliffTransUnit[]): void {
    this.$isObsoleteTranslation = currentTranslations.some(
      currentTrad => templateTranslations.filter(trad => trad.$.id === currentTrad.$.id).length === 0
    );
  }
}
