import { Component, EventEmitter, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Data } from '@angular/router';
import { IXliff, IXliffTransUnit } from '@vtabary/xliff2js';
import { combineLatest, merge, Observable } from 'rxjs';
import { filter, map, shareReplay, startWith } from 'rxjs/operators';
// import { HistoryService } from 'src/app/modules/shared/public-api';
import { XLIFF_WRITING, XLIFFWritingInterface } from '../../models/xliff-file.service.interface';
import { NotificationService } from '../../services/notification/notification.service';
import { TranslationsService } from '../../services/translations/translations.service';
import { ResolvedXLIFF } from '../../services/xliff-resolver/xliff-resolver.service';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent {
  public group: UntypedFormGroup;
  public toTranslate$: Observable<IXliffTransUnit[]>;
  public translated$: Observable<IXliffTransUnit[]>;
  public translations$: Observable<IXliffTransUnit[]>;
  public translations: IXliff;
  public resolvedXliff: ResolvedXLIFF;
  public targetLanguage: string;
  public isObsoleteTranslation = false;
  public openModalDeleteObsolete = false;
  public searched$ = new EventEmitter<string>();

  private refreshed = new EventEmitter();

  constructor(
    private translationsService: TranslationsService,
    @Inject(XLIFF_WRITING)
    private xliffService: XLIFFWritingInterface,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService // private historyService: HistoryService,
  ) {
    this.translations$ = merge(
      this.activatedRoute.data.pipe(
        filter(data => !!data.files),
        map<Data, ResolvedXLIFF>(data => {
          this.resolvedXliff = data.files;
          return this.resolvedXliff;
        })
      ),
      this.refreshed.pipe(map(() => this.resolvedXliff))
    ).pipe(
      map(resolvedXliff => {
        return translationsService.parseXLiff(resolvedXliff.file.content, resolvedXliff.template.content);
      }),
      map(locale => {
        this.translations = locale;
        this.targetLanguage = locale.children[0]?.$?.['target-language'];
        // this.historyService.add({ path: this.filePath, type: 'file' });
        this.isObsoleteTranslation = this.translationsService.isObsoleteTranslation;

        return this.translationsService.getAllTranslations(locale);
      }),
      this.filterOperator(this.searched$),
      shareReplay(1)
    );

    this.toTranslate$ = this.translations$.pipe(this.filterByTranslatedOperator(false), shareReplay(1));

    this.translated$ = this.translations$.pipe(this.filterByTranslatedOperator(true), shareReplay(1));
  }
  /**
   * @internal
   */
  public async onSave() {
    this.saveXLIFF(this.translations, 'Translation file saved');
  }

  /**
   * @internal
   */
  public refresh() {
    this.refreshed.emit();
  }

  public openModal(): void {
    this.openModalDeleteObsolete = true;
  }

  public deleteObsoleteKey(isConfirm: boolean): void {
    this.openModalDeleteObsolete = false;

    if (!isConfirm) {
      return;
    }

    this.saveXLIFF(this.translations, 'Obsolete translation key deleted');
    this.isObsoleteTranslation = false;
  }

  private filterByTranslatedOperator(translated: boolean): (source: Observable<IXliffTransUnit[]>) => Observable<IXliffTransUnit[]> {
    return source$ =>
      new Observable(observer => {
        return source$.subscribe({
          next: translations => observer.next(this.translationsService.filterByTranslatedOperator(translations, translated)),
          error: err => observer.error(err),
          complete: () => observer.complete(),
        });
      });
  }

  private filterOperator(filter$: Observable<string>): (source: Observable<IXliffTransUnit[]>) => Observable<IXliffTransUnit[]> {
    return source$ =>
      new Observable(observer => {
        return combineLatest([source$, filter$.pipe(startWith(''))]).subscribe({
          next: data => observer.next(this.filterByText(data[0], data[1])),
          error: err => observer.error(err),
          complete: () => observer.complete(),
        });
      });
  }

  private filterByText(translations: IXliffTransUnit[], filter: string): IXliffTransUnit[] {
    const formatFilter = filter.trim();
    if (formatFilter === '') {
      return translations;
    }

    return translations.filter(translation => {
      return translation.name.indexOf(formatFilter) >= 0 || translation.$.id.indexOf(formatFilter) >= 0;
    });
  }

  private saveXLIFF(translations: IXliff, message: string): void {
    this.xliffService.saveXLIFF(this.resolvedXliff.file.path, translations);
    this.notification.success({ message });
  }
}
