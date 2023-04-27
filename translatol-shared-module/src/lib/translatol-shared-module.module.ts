import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { TranslationItemComponent } from './components/translation-item/translation-item.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TranslationsComponent } from './components/translations/translations.component';
import { TEMPLATE_FILE_HANDLER, TemplateFileHandlerInterface } from './models/template-file.service.interface.1';
import { XLIFFWritingInterface, XLIFF_WRITING } from './models/xliff-file.service.interface';
import { EndOfStringPipe } from './pipes/end-of-string/end-of-string.pipe';

function initializeTranslatolSharedModule(
  xliffFileHandler?: XLIFFWritingInterface,
  templateFileHandler?: TemplateFileHandlerInterface
): () => Promise<void> {
  return () =>
    new Promise((resolve, reject) => {
      // if (xliffFileHandler === undefined) {
      //   reject('TranslatolSharedModuleModule requires a XLIFF_FILE_HANDLER provider implementing XLiffFileHandlerInterface');
      //   return;
      // }

      // if (templateFileHandler === undefined) {
      //   reject('TranslatolSharedModuleModule requires a XLIFF_FILE_HANDLER provider implementing templateFileHandler');
      //   return;
      // }
      resolve();
    });
}

@NgModule({
  declarations: [
    EndOfStringPipe,
    TranslationComponent,
    TranslationItemComponent,
    TranslationListComponent,
    TranslationNavigationComponent,
    TranslationsComponent,
    TranslationSearchComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ClarityModule],
  exports: [
    EndOfStringPipe,
    TranslationComponent,
    TranslationItemComponent,
    TranslationListComponent,
    TranslationNavigationComponent,
    TranslationsComponent,
    TranslationSearchComponent,
  ],
  providers: [
    { provide: XLIFF_WRITING, useValue: undefined },
    { provide: TEMPLATE_FILE_HANDLER, useValue: undefined },

    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslatolSharedModule,
      multi: true,
      deps: [XLIFF_WRITING, TEMPLATE_FILE_HANDLER],
    },
  ],
})
export class TranslatolSharedModule {}
