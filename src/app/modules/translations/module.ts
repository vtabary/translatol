import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../shared/shared.module';
import { TranslationsRoutingModule } from './app-routing.module';
import { FileListComponent } from './components/file-list/file-list.component';
import { TranslationItemComponent } from './components/translation-item/translation-item.component';
import { TranslationLanguageComponent } from './components/translation-language/translation-language.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { TranslationComponent } from './components/translation/translation.component';
import { FolderTranslationsComponent } from './pages/folder-translations/folder-translations.component';
import { NoFileComponent } from './pages/no-file/no-file.component';
import { TranslationsComponent } from './pages/translations/translations.component';

@NgModule({
  declarations: [
    TranslationsComponent,
    FileListComponent,
    TranslationComponent,
    TranslationListComponent,
    TranslationNavigationComponent,
    TranslationSearchComponent,
    TranslationLanguageComponent,
    TranslationItemComponent,
    FolderTranslationsComponent,
    NoFileComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClarityModule,
    SharedModule,
    TranslationsRoutingModule,
  ]
})
export class TranslationsModule {}
