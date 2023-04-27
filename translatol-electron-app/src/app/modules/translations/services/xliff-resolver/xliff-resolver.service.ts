import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ResolvedXLIFF, XliffResolverService } from 'translatol-shared-module';

export class VSCodeXliffResolverService implements XliffResolverService {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<ResolvedXLIFF> {
    return Promise.resolve(route.data['files'] as ResolvedXLIFF);
  }
}
