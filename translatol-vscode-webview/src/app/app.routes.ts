import { Route } from '@angular/router';
import { TranslatePageComponent } from './pages/translate-page/translate-page.component';
import { TranslationsComponent, xliffResolver } from 'translatol-shared-module';

export const appRoutes: Route[] = [
  {
    path: '**',
    component: TranslationsComponent,
    resolve: {
      files: xliffResolver,
    },
  },
];
