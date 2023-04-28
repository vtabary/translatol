import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { ClarityModule } from '@clr/angular';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationComponent } from './components/notification/notification.component';
import { TranslationItemComponent } from './components/translation-item/translation-item.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TranslationsComponent } from './components/translations/translations.component';
import { AppRouteReuseStrategy } from './models/reload-route-reuse-strategy/reload-route-reuse-strategy';
import { XLIFF_WRITING_SERVICE } from './models/xliff-file.service.interface';
import { EndOfStringPipe } from './pipes/end-of-string/end-of-string.pipe';

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
    { provide: XLIFF_WRITING_SERVICE, useValue: undefined },
    { provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy },
  ],
})
export class TranslatolSharedModule {}
