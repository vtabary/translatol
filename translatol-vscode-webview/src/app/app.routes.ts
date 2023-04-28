import { Route } from '@angular/router';
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
