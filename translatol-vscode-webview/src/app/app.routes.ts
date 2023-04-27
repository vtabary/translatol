import { Route } from '@angular/router';
import { TranslatePageComponent } from './pages/translate-page/translate-page.component';

export const appRoutes: Route[] = [{ path: '**', component: TranslatePageComponent }];
