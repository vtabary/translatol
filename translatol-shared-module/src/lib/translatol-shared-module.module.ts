import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { XLIFFFileHandlerInterface, XLIFF_FILE_HANDLER } from './models/xliff-file.service.interface';
import { NotificationComponent } from './components/notification/notification.component';
import { TranslationItemComponent } from './components/translation-item/translation-item.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TranslationsComponent } from './components/translations/translations.component';
import { ModalComponent } from './components/modal/modal.component';
import { TEMPLATE_FILE_HANDLER, TemplateFileHandlerInterface } from './models/template-file.service.interface.1';
import { EndOfStringPipe } from './pipes/end-of-string/end-of-string.pipe';

function initializeTranslatolSharedModule(
  xliffFileHandler?: XLIFFFileHandlerInterface,
  templateFileHandler?: TemplateFileHandlerInterface
): () => Promise<void> {
  return () =>
    new Promise((resolve, reject) => {
      if (xliffFileHandler === undefined) {
        reject('TranslatolSharedModuleModule requires a XLIFF_FILE_HANDLER provider implementing XLiffFileHandlerInterface');
        return;
      }

      if (templateFileHandler === undefined) {
        reject('TranslatolSharedModuleModule requires a XLIFF_FILE_HANDLER provider implementing templateFileHandler');
        return;
      }
      resolve();
    });
}

const exportedComponents = [
  NotificationComponent,
  TranslationComponent,
  TranslationItemComponent,
  TranslationListComponent,
  TranslationNavigationComponent,
  TranslationsComponent,
  TranslationSearchComponent,
];

@NgModule({
  declarations: [exportedComponents, EndOfStringPipe, ModalComponent],
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  exports: [EndOfStringPipe],
  providers: [
    { provide: XLIFF_FILE_HANDLER, useValue: undefined },
    { provide: TEMPLATE_FILE_HANDLER, useValue: undefined },

    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslatolSharedModule,
      multi: true,
      deps: [XLIFF_FILE_HANDLER, TEMPLATE_FILE_HANDLER],
    },
  ],
})
export class TranslatolSharedModule {}
