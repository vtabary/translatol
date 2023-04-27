import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { TranslatePageComponent } from './pages/translate-page/translate-page.component';

@NgModule({
  declarations: [AppComponent, TranslatePageComponent],
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
