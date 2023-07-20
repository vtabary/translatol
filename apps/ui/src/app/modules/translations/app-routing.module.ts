import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  TranslationsComponent,
  xliffResolver,
} from '@translatol/shared-module';
import { FolderTranslationsComponent } from './pages/folder-translations/folder-translations.component';
import { NoFileComponent } from './pages/no-file/no-file.component';

const routes: Routes = [
  {
    path: 'folder',
    children: [
      {
        path: ':folder',
        component: FolderTranslationsComponent,
        children: [
          {
            path: ':properties',
            component: TranslationsComponent,
            data: {
              reuseComponent: false,
            },
            resolve: {
              files: xliffResolver,
            },
            runGuardsAndResolvers: 'always',
          },
          {
            path: '',
            component: NoFileComponent,
          },
        ],
      },
    ],
  },
  {
    path: ':properties',
    component: TranslationsComponent,
    data: {
      reuseComponent: false,
    },
    resolve: {
      files: xliffResolver,
    },
    runGuardsAndResolvers: 'always',
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TranslationsRoutingModule {}
