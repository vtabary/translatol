import { Component } from '@angular/core';
import { HistoryService } from 'src/app/services/history/history.service';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  public filePaths: string[];

  constructor(
    private historyService: HistoryService,
    private electron: ElectronService
  ) {
    this.filePaths = this.historyService.list();
  }

  public copy(filePath: string) {
    this.electron.clipboard.writeText(filePath, 'clipboard');
  }
}
