import { Component, EventEmitter, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IXliff, IXliffTransUnit } from '@vtabary/xliff2js';
import { Observable, combineLatest, merge } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take } from 'rxjs/operators';
import { XLIFF_FILE_HANDLER, XLIFFFileHandlerInterface } from '../../models/xliff-file.service.interface';
import { TranslationsService } from '../../services/translations/translations.service';
import { NotificationService } from '../../services/notification/notification.service';
// import { HistoryService, NotificationService } from 'src/app/modules/shared/public-api';

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
  public duplicated: IXliffTransUnit[];

  public filePath: string;
  public targetLanguage: string;
  public isObsoleteTranslation = false;
  public openModalDeleteObsolete = false;
  public searched$ = new EventEmitter<string>();

  private refreshed = new EventEmitter();

  constructor(
    private translationsService: TranslationsService,
    @Inject(XLIFF_FILE_HANDLER)
    private fileService: XLIFFFileHandlerInterface,
    private activatedRoute: ActivatedRoute,
    private notification: NotificationService // private historyService: HistoryService,
  ) {
    this.translations$ = merge(
      this.activatedRoute.params.pipe(
        filter(params => !!params.properties),
        map(params => (this.filePath = atob(params.properties)))
      ),
      this.refreshed.pipe(map(() => this.filePath))
    ).pipe(
      switchMap(filePath => translationsService.load(filePath)),
      map(({ locale, duplicated }) => {
        this.duplicated = duplicated;
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

  public async onSave() {
    this.saveXLIFF(this.translations, 'Translation file saved');
  }

  public refresh(): void {
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

    this.translationsService.load(this.filePath).subscribe(({ locale, duplicated }) => {
      this.duplicated = duplicated;
      this.saveXLIFF(locale, 'Obsolete translation key deleted');
      this.isObsoleteTranslation = false;
    });
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
    this.fileService
      .saveXLIFF(this.filePath, translations)
      .pipe(take(1))
      .subscribe(() => this.notification.success({ message }));
  }
}
