import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityIcons, fileIcon, folderIcon, infoStandardIcon, searchIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { TranslatolSharedModule } from 'translatol-shared-module';
import { SharedModule } from '../shared/shared.module';
import { TranslationsRoutingModule } from './app-routing.module';
import { FileListComponent } from './components/file-list/file-list.component';
import { TranslationLanguageComponent } from './components/translation-language/translation-language.component';
import { FolderTranslationsComponent } from './pages/folder-translations/folder-translations.component';
import { NoFileComponent } from './pages/no-file/no-file.component';

ClarityIcons.addIcons(fileIcon, folderIcon, infoStandardIcon, searchIcon);

@NgModule({
  declarations: [FileListComponent, TranslationLanguageComponent, FolderTranslationsComponent, NoFileComponent],
  imports: [CommonModule, ReactiveFormsModule, ClarityModule, SharedModule, TranslatolSharedModule, TranslationsRoutingModule],
})
export class TranslationsModule {}
