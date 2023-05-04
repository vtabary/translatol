import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  NOTIFICATION_SERVICE,
  TranslatolSharedModule,
  XLIFF_RESOLVER_SERVICE,
  XLIFF_WRITING_SERVICE,
} from '@translatol/shared-module';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FileService } from './services/file/file.service';
import { NotificationService } from './services/notification/notification.service';
import { PostMessageService } from './services/post-message/post-message.service';
import { VSCodeXliffResolverService } from './services/vscode-xliff-resolver/vscode-xliff-resolver.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    TranslatolSharedModule,
    BrowserAnimationsModule,
  ],
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
    { provide: NOTIFICATION_SERVICE, useExisting: NotificationService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
