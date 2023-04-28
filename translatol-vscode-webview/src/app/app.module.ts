import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslatolSharedModule, XLIFF_RESOLVER_SERVICE, XLIFF_WRITING_SERVICE } from 'translatol-shared-module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { TranslatePageComponent } from './pages/translate-page/translate-page.component';
import { FileService } from './services/file/file.service';
import { PostMessageService } from './services/post-message/post-message.service';
import { VSCodeXliffResolverService } from './services/vscode-xliff-resolver/vscode-xliff-resolver.service';

@NgModule({
  declarations: [AppComponent, TranslatePageComponent],
  imports: [CommonModule, BrowserModule, RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }), TranslatolSharedModule],
  providers: [
    {
      provide: XLIFF_RESOLVER_SERVICE,
      useClass: VSCodeXliffResolverService,
      deps: [PostMessageService],
    },
    {
      provide: XLIFF_WRITING_SERVICE,
      useClass: FileService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
