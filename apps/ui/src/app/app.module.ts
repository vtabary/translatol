import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { XLIFF_WRITING_SERVICE } from '@translatol/shared-module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './modules/shared/shared.module';
import { TranslationsModule } from './modules/translations/module';
import { FileService } from './modules/translations/services/file/file.service';
import { AboutComponent } from './pages/about/about.component';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { RootComponent } from './pages/root/root.component';

@NgModule({
  providers: [
    {
      provide: XLIFF_WRITING_SERVICE,
      useClass: FileService,
    },
  ],
  declarations: [MainLayoutComponent, RootComponent, AboutComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslationsModule,
  ],

  bootstrap: [RootComponent],
})
export class AppModule {}
