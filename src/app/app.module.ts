import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxElectronModule } from 'ngx-electron';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { RootComponent } from './pages/root/root.component';
import { TranslationsComponent } from './pages/translations/translations.component';
import { TranslationComponent } from './components/translation/translation.component';
import { TranslationNavigationComponent } from './components/translation-navigation/translation-navigation.component';
import { TranslationListComponent } from './components/translation-list/translation-list.component';
import { TranslationLanguageComponent } from './components/translation-language/translation-language.component';
import { HistoryComponent } from './components/history/history.component';
import { OpenerComponent } from './components/opener/opener.component';
import { TranslationItemComponent } from './components/translation/translation-item/translation-item.component';
import { TranslationSearchComponent } from './components/translation-search/translation-search.component';
import { AboutComponent } from './pages/about/about.component';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    HomeComponent,
    RootComponent,
    TranslationsComponent,
    TranslationComponent,
    TranslationNavigationComponent,
    TranslationListComponent,
    TranslationLanguageComponent,
    HistoryComponent,
    OpenerComponent,
    TranslationItemComponent,
    TranslationSearchComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxElectronModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
