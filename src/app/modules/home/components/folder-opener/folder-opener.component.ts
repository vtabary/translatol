import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'src/app/modules/shared/public-api';

@Component({
  selector: 'app-folder-opener',
  templateUrl: './folder-opener.component.html'
})
export class FolderOpenerComponent {
  constructor(
    private electron: ElectronService,
    private router: Router
  ) {}

  public onSelectFolder(): void {
    if (!this.electron.isElectron) {
      return;
    }

    this.electron.remote.dialog.showOpenDialog(
      {
        properties: ['openDirectory'],
      }
    ).then(result => {
      if (result.canceled) {
        return;
      }
      this.openFolder(result.filePaths[0]);
    });
  }

  private openFolder(folderPath: string) {
    this.router.navigate([ '/translate/folder/', btoa(folderPath) ]);
  }
}
