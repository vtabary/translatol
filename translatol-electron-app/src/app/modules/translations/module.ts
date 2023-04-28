import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityIcons, fileIcon, folderIcon, infoStandardIcon, searchIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { TEMPLATE_FILE_HANDLER, TranslatolSharedModule, XLIFF_FILE_HANDLER } from 'translatol-shared-module';
import { SharedModule } from '../shared/shared.module';
import { TranslationsRoutingModule } from './app-routing.module';
import { FileListComponent } from './components/file-list/file-list.component';
import { TranslationLanguageComponent } from './components/translation-language/translation-language.component';
import { FolderTranslationsComponent } from './pages/folder-translations/folder-translations.component';
import { NoFileComponent } from './pages/no-file/no-file.component';
import { FileService } from './services/file/file.service';
import { PathService } from './services/path/path.service';

ClarityIcons.addIcons(fileIcon, folderIcon, infoStandardIcon, searchIcon);

@NgModule({
  providers: [
    {
      provide: XLIFF_FILE_HANDLER,
      useClass: FileService,
    },
    {
      provide: TEMPLATE_FILE_HANDLER,
      useClass: PathService,
    },
  ],
  declarations: [FileListComponent, TranslationLanguageComponent, FolderTranslationsComponent, NoFileComponent],
  imports: [CommonModule, ReactiveFormsModule, ClarityModule, SharedModule, TranslatolSharedModule, TranslationsRoutingModule],
})
export class TranslationsModule {}
