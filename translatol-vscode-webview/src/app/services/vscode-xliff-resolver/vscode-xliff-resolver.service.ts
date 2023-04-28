import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ResolvedXLIFF, XliffResolverService } from 'translatol-shared-module';
import { PostMessageService } from '../post-message/post-message.service';

@Injectable({ providedIn: 'root' })
export class VSCodeXliffResolverService implements XliffResolverService {
  constructor(private postMessageService: PostMessageService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResolvedXLIFF> {
    return this.postMessageService.onMessageReceive;
  }
}
