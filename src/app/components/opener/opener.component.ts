import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.scss']
})
export class OpenerComponent {
  public dragover = -1;

  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = 1;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = -1;
  }

  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragover = -1;

    const files = evt.dataTransfer.files as File[];
    if (files.length > 1) {
      console.log('Can not load multiple files');
    }

    if (files.length === 0) {
      return;
    }

    this.openFile(files[0].path);
  }

  constructor(
    private electron: ElectronService,
    private router: Router
  ) {}

  public onOpenTranslation() {
    this.electron.remote.dialog.showOpenDialog(
      {
        properties: ['openFile'],
        filters: [ { name: 'XLIFF', extensions: [ 'xlf' ] } ]
      }
    ).then(result => {
      if (result.canceled) {
        return;
      }
      this.openFile(result.filePaths[0]);
    });
  }

  private openFile(filePath: string) {
    this.router.navigate([ '/translate', btoa(filePath) ]);
  }
}
