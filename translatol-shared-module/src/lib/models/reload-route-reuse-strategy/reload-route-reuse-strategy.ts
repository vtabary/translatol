import { ActivatedRouteSnapshot, BaseRouteReuseStrategy } from '@angular/router';

export class ReloadRouteReuseStrategy extends BaseRouteReuseStrategy {
  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return false;
  }
}
