import { Component, Input } from '@angular/core';
import { ClipboardService } from '../../services/clipboard/clipboard.service';

@Component({
  selector: 'app-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
})
export class CopyToClipboardComponent {
  @Input()
  public toCopy?: string;

  constructor(private clipboardService: ClipboardService) {}

  public copy(filePath?: string) {
    if (!filePath) {
      return;
    }
    this.clipboardService.writeInClipboard(filePath);
  }
}
