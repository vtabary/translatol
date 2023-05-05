import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import {
  provideVSCodeDesignSystem,
  vsCodeBadge,
  vsCodeButton,
  vsCodeLink,
  vsCodeTag,
  vsCodeTextField,
} from '@vscode/webview-ui-toolkit';
import { AlertWarningComponent } from './components/alert-warning/alert-warning.component';
import { CopyToClipboardComponent } from './components/copy-to-clipboard/copy-to-clipboard.component';
import { ModalComponent } from './components/modal/modal.component';
import { TranslationDuplicatedListComponent } from './components/translation-duplicated-list/translation-duplicated-list.component';
import { TranslationInterpolationComponent } from './components/translation-interpolation/translation-interpolation.component';
import { TranslationItemSimpleComponent } from './components/translation-item-simple/translation-item-simple.component';
import { TranslationItemComponent } from './components/translation-item/translation-item.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationPluralItemComponent } from './components/translation-plural/translation-plural-item/translation-plural-item.component';
import { TranslationPluralComponent } from './components/translation-plural/translation-plural.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TranslationsComponent } from './components/translations/translations.component';
import { ReloadRouteReuseStrategy } from './models/reload-route-reuse-strategy/reload-route-reuse-strategy';
import { XLIFF_WRITING_SERVICE } from './models/xliff-file.service.interface';
import { EndOfStringPipe } from './pipes/end-of-string/end-of-string.pipe';
provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodeBadge(),
  vsCodeTextField(),
  vsCodeLink(),
  vsCodeTag()
);

const exportedComponent = [
  CopyToClipboardComponent,
  TranslationComponent,
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
    TranslationDuplicatedListComponent,
    TranslationInterpolationComponent,
    TranslationItemComponent,
    TranslationItemSimpleComponent,
    TranslationPluralComponent,
    TranslationPluralItemComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, ClarityModule],
  exports: [EndOfStringPipe, ...exportedComponent],
  providers: [
    { provide: XLIFF_WRITING_SERVICE, useValue: undefined },
    { provide: RouteReuseStrategy, useClass: ReloadRouteReuseStrategy },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TranslatolSharedModule {}
