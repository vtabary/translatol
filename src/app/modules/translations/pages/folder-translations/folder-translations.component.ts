import { Observable, of } from 'rxjs';
import { filter, map, switchMap, catchError, startWith } from 'rxjs/operators';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectronService, HistoryService } from 'src/app/modules/shared/public-api';

@Component({
  selector: 'app-folder-translations',
  templateUrl: './folder-translations.component.html',
  styleUrls: ['./folder-translations.component.scss'],
})
export class FolderTranslationsComponent {
  public filePaths$: Observable<string[]>;
  public folderPath: string;

  constructor(electronService: ElectronService, activatedRoute: ActivatedRoute, historyService: HistoryService) {
    this.filePaths$ = activatedRoute.params.pipe(
      filter(params => !!params.folder),
      map(params => {
        this.folderPath = atob(params.folder);
        historyService.add({ path: this.folderPath, type: 'folder' });
        return this.folderPath;
      }),
      switchMap(folderPath => electronService.remote.require('fast-glob')(['**/*.xlf'], { cwd: folderPath }) as Promise<string[]>),
      catchError(() => of([])),
      startWith([])
    );
  }
}
