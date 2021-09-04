import { Component } from '@angular/core';
import { ElectronService, HistoryService } from 'src/app/modules/shared/public-api';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  public filePaths: { path: string; type: 'file' | 'folder' }[];

  constructor(private historyService: HistoryService, private electron: ElectronService) {
    this.filePaths = this.historyService.list();
  }

  public copy(filePath: string) {
    this.electron.clipboard.writeText(filePath, 'clipboard');
  }
}
