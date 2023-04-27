import { Component } from '@angular/core';
import { HistoryService } from '../../../shared/public-api';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  public filePaths: { path: string; type: 'file' | 'folder' }[];

  constructor(private historyService: HistoryService) {
    this.filePaths = this.historyService.list();
  }
}
