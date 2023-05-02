import { Component, EventEmitter, Inject } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { IXliff, IXliffTransUnit } from '@vtabary/xliff2js';
import { Observable, combineLatest } from 'rxjs';
import { filter, map, shareReplay, startWith, tap } from 'rxjs/operators';
// import { HistoryService } from 'src/app/modules/shared/public-api';
import {
  NOTIFICATION_SERVICE,
  NotificationServiceInterface,
} from '../../models/notification.service.interface';
import {
  XLIFFWritingInterface,
  XLIFF_WRITING_SERVICE,
} from '../../models/xliff-file.service.interface';
import { TranslationsService } from '../../services/translations/translations.service';
import { ResolvedXLIFF } from '../../services/xliff-resolver/xliff-resolver.service';

function asFilesProp<T extends Data>(
  value: Data | undefined
): value is Data & { files: any[] } {
  return !!value?.['files'];
}

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss'],
})
export class TranslationsComponent {
  public group?: UntypedFormGroup;
  public toTranslate$: Observable<IXliffTransUnit[]>;
  public translated$: Observable<IXliffTransUnit[]>;
  public translations$: Observable<IXliffTransUnit[]>;
  public translations?: IXliff;
  public resolvedXliff?: ResolvedXLIFF;
  public duplicated?: IXliffTransUnit[];
  public targetLanguage?: string;
  public isObsoleteTranslation = false;
  public openModalDeleteObsolete = false;
  public searched$ = new EventEmitter<string>();

  constructor(
    private translationsService: TranslationsService,
    @Inject(XLIFF_WRITING_SERVICE)
    private xliffService: XLIFFWritingInterface,
    private activatedRoute: ActivatedRoute,
    @Inject(NOTIFICATION_SERVICE)
    private notification: NotificationServiceInterface, // private historyService: HistoryService,
    private router: Router
  ) {
    this.translations$ = this.activatedRoute.data.pipe(
      filter(asFilesProp),
      tap<Data>((data) => {
        this.resolvedXliff = data['files'];
      }),
      map(() => {
        return translationsService.parseXLiff(
          this.resolvedXliff?.file?.content,
          this.resolvedXliff?.template.content
        );
      }),
      map(({ locale, duplicated }) => {
        this.duplicated = duplicated;
        this.translations = locale;
        this.targetLanguage = locale?.children[0]?.$?.['target-language'];
        // this.historyService.add({ path: this.filePath, type: 'file' });
        this.isObsoleteTranslation =
          this.translationsService.isObsoleteTranslation;

        return this.translationsService.getAllTranslations(locale);
      }),
      this.filterOperator(this.searched$),
      shareReplay(1)
    );

    this.toTranslate$ = this.translations$.pipe(
      this.filterByTranslatedOperator(false),
      shareReplay(1)
    );

    this.translated$ = this.translations$.pipe(
      this.filterByTranslatedOperator(true),
      shareReplay(1)
    );
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
  public async refresh() {
    // Reload same URL, router is configured to handle reload
    await this.router.navigateByUrl(this.router.url, {
      onSameUrlNavigation: 'reload',
    });
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

  private filterByTranslatedOperator(
    translated: boolean
  ): (source: Observable<IXliffTransUnit[]>) => Observable<IXliffTransUnit[]> {
    return (source$) =>
      new Observable((observer) => {
        return source$.subscribe({
          next: (translations) =>
            observer.next(
              this.translationsService.filterByTranslatedOperator(
                translations,
                translated
              )
            ),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
  }

  private filterOperator(
    filter$: Observable<string>
  ): (source: Observable<IXliffTransUnit[]>) => Observable<IXliffTransUnit[]> {
    return (source$) =>
      new Observable((observer) => {
        return combineLatest([source$, filter$.pipe(startWith(''))]).subscribe({
          next: (data) => observer.next(this.filterByText(data[0], data[1])),
          error: (err) => observer.error(err),
          complete: () => observer.complete(),
        });
      });
  }

  private filterByText(
    translations: IXliffTransUnit[],
    filter: string
  ): IXliffTransUnit[] {
    const formatFilter = filter.trim();
    if (formatFilter === '') {
      return translations;
    }

    return translations.filter((translation) => {
      return (
        translation.name.indexOf(formatFilter) >= 0 ||
        translation.$.id.indexOf(formatFilter) >= 0
      );
    });
  }

  private saveXLIFF(translations: IXliff | undefined, message: string): void {
    if (!this.resolvedXliff?.file.path || !translations) {
      return;
    }

    this.xliffService.saveXLIFF(this.resolvedXliff.file.path, translations);
    this.notification.showInformation(message);
  }
}
