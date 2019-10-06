import { Observable, merge } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { Component, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslationsService } from 'src/app/services/translations/translations.service';
import { FileService } from 'src/app/services/file/file.service';
import { HistoryService } from 'src/app/services/history/history.service';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { IXliffTransUnit, IXliff } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translations',
  templateUrl: './translations.component.html',
  styleUrls: ['./translations.component.scss']
})
export class TranslationsComponent {
  public group: FormGroup;
  public toTranslate$: Observable<IXliffTransUnit[]>;
  public translated$: Observable<IXliffTransUnit[]>;
  public translations: IXliff;
  public filePath: string;

  private refreshed = new EventEmitter();

  constructor(
    translationsService: TranslationsService,
    private fileService: FileService,
    private activatedRoute: ActivatedRoute,
    private historyService: HistoryService,
    private notification: NotificationService
  ) {
    const translations$ = merge(
        this.activatedRoute.params.pipe(map(params => this.filePath = atob(params.properties))),
        this.refreshed.pipe(map(() => this.filePath)),
      ).pipe(
        switchMap(filePath => translationsService.load(filePath)),
        map(locale => {
          this.translations = locale;
          this.historyService.add(this.filePath);
          return translationsService.getAllTranslations(locale);
        }),
        shareReplay(1)
      );

    this.toTranslate$ = translations$.pipe(
      map(translations => translations.filter(translation => !translation.children.some(child => child.name === 'target'))),
      shareReplay(1)
    );
    this.translated$ = translations$.pipe(
      map(translations => translations.filter(translation => translation.children.some(child => child.name === 'target'))),
      shareReplay(1)
    );
  }

  public onSave() {
    this.fileService.saveXLIFF(
        this.filePath,
        this.translations
      )
      .pipe(switchMap(() => this.notification.success({
        message: 'Translation file saved',
      })))
      .subscribe();
  }

  public refresh() {
    this.refreshed.emit();
  }
}
