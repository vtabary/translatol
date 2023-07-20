import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResolvedXLIFF, XliffResolverService } from '@translatol/shared-module';
import { FileService } from '../file/file.service';
import { PathService } from '../path/path.service';

@Injectable({ providedIn: 'root' })
export class ElectronXliffResolverService implements XliffResolverService {
  constructor(
    private fileService: FileService,
    private pathService: PathService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<ResolvedXLIFF> {
    const filePath = atob(route.params['properties']);
    const templatePath = this.pathService.getTemplatePath(filePath);
    return combineLatest([
      this.fileService.open(filePath),
      this.fileService.open(templatePath),
    ]).pipe(
      map(([fileXliff, templateXliff]) => {
        return {
          file: {
            path: filePath,
            content: fileXliff,
          },
          template: {
            path: templatePath,
            content: templateXliff,
          },
        };
      })
    );
  }
}
