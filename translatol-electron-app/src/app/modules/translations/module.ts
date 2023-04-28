import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityIcons, fileIcon, folderIcon, infoStandardIcon, searchIcon } from '@cds/core/icon';
import { ClarityModule } from '@clr/angular';
import { TranslatolSharedModule, XLIFF_RESOLVER_SERVICE, XLIFF_WRITING_SERVICE } from 'translatol-shared-module';
import { SharedModule } from '../shared/shared.module';
import { TranslationsRoutingModule } from './app-routing.module';
import { FileListComponent } from './components/file-list/file-list.component';
import { TranslationLanguageComponent } from './components/translation-language/translation-language.component';
import { FolderTranslationsComponent } from './pages/folder-translations/folder-translations.component';
import { NoFileComponent } from './pages/no-file/no-file.component';
import { ElectronXliffResolverService } from './services/electron-xliff-resolver/electron-xliff-resolver.service';
import { FileService } from './services/file/file.service';

ClarityIcons.addIcons(fileIcon, folderIcon, infoStandardIcon, searchIcon);

@NgModule({
  providers: [
    {
      provide: XLIFF_WRITING_SERVICE,
      useClass: FileService,
    },
    {
      provide: XLIFF_RESOLVER_SERVICE,
      useClass: ElectronXliffResolverService,
    },
  ],
  declarations: [FileListComponent, TranslationLanguageComponent, FolderTranslationsComponent, NoFileComponent],
  imports: [CommonModule, ReactiveFormsModule, ClarityModule, SharedModule, TranslatolSharedModule, TranslationsRoutingModule],
})
export class TranslationsModule {}
