import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FolderTranslationsComponent } from './pages/folder-translations/folder-translations.component';
import { NoFileComponent } from './pages/no-file/no-file.component';
import { TranslationsComponent } from './pages/translations/translations.component';

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
          },
          {
            path: '',
            component: NoFileComponent,
          },
        ]
      },
    ]
  },
  {
    path: ':properties',
    component: TranslationsComponent,
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TranslationsRoutingModule { }
