import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ClarityIcons, copyToClipboardIcon, fileIcon, folderIcon, infoStandardIcon, searchIcon } from '@cds/core/icon';
import { AlertWarningComponent } from './components/alert-warning/alert-warning.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TranslationDuplicatedListComponent } from './components/translation-duplicated-list/translation-duplicated-list.component';
import { TranslationItemComponent } from './components/translation-item/translation-item.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TranslationsComponent } from './components/translations/translations.component';
import { ReloadRouteReuseStrategy } from './models/reload-route-reuse-strategy/reload-route-reuse-strategy';
import { XLIFF_WRITING_SERVICE } from './models/xliff-file.service.interface';
import { EndOfStringPipe } from './pipes/end-of-string/end-of-string.pipe';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';
import { TranslationPluralComponent } from './components/translation-plural/translation-plural.component';
import { TranslationInterpolationComponent } from './components/translation-interpolation/translation-interpolation.component';

ClarityIcons.addIcons(fileIcon, folderIcon, infoStandardIcon, searchIcon, copyToClipboardIcon);

const exportedComponent = [
  CopyToClipboardComponent,
  TranslationComponent,
  TranslationItemComponent,
  TranslationListComponent,
  TranslationNavigationComponent,
  TranslationsComponent,
  TranslationSearchComponent,
];

@NgModule({
  declarations: [
    ...exportedComponent,
    AlertWarningComponent,
    EndOfStringPipe,
    ModalComponent,
    NotificationComponent,
    TranslationDuplicatedListComponent,
    TranslationPluralComponent,
    TranslationInterpolationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  exports: [EndOfStringPipe, ...exportedComponent],
  providers: [
    { provide: XLIFF_WRITING_SERVICE, useValue: undefined },
    { provide: RouteReuseStrategy, useClass: ReloadRouteReuseStrategy },
  ],
})
export class TranslatolSharedModule {}
