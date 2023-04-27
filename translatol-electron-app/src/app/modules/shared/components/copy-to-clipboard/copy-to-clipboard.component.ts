import { Component, Input } from '@angular/core';
import { ElectronService } from '../../services/electron/electron.service';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
})
export class CopyToClipboardComponent {
  @Input()
  public toCopy?: string;

  constructor(private electron: ElectronService) {}

  public copy(filePath?: string) {
    if (!filePath) {
      return;
    }

    this.electron.clipboard.writeText(filePath, 'clipboard');
  }
}
