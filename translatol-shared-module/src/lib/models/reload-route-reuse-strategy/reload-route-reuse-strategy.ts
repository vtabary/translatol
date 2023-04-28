import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

export class AppRouteReuseStrategy extends BaseRouteReuseStrategy {
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}
