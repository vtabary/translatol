import { InjectionToken, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
export interface ResolvedXLIFF {
  file: {
    path: string;
    content: string;
  };
  template: {
    path: string;
    content: string;
  };
}

export interface XliffResolverService {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedXLIFF>;
}

export const XLIFF_RESOLVER_SERVICE = new InjectionToken<XliffResolverService>('XLIFF_RESOLVER_SERVICE');

export const xliffResolver: ResolveFn<ResolvedXLIFF> = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return inject(XLIFF_RESOLVER_SERVICE).resolve(route, state);
};
