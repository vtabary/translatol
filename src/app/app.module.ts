import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { RootComponent } from './pages/root/root.component';
import { AboutComponent } from './pages/about/about.component';
import { SharedModule } from './modules/shared/shared.module';

import '@cds/core/icon/register.js';
import { ClarityIcons, helpIcon, languageIcon } from '@cds/core/icon';

ClarityIcons.addIcons(helpIcon, languageIcon);

@NgModule({
  declarations: [MainLayoutComponent, RootComponent, AboutComponent],
  imports: [BrowserModule, AppRoutingModule, ClarityModule, BrowserAnimationsModule, ReactiveFormsModule, SharedModule],
  providers: [],
  bootstrap: [RootComponent],
})
export class AppModule {}
