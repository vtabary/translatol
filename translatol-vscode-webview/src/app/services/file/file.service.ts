import { Injectable } from '@angular/core';
import { IXliff, XliffBuilder } from '@vtabary/xliff2js';
import { XLIFFWritingInterface } from 'translatol-shared-module';
import { PostMessageService } from '../post-message/post-message.service';

@Injectable({ providedIn: 'root' })
export class FileService implements XLIFFWritingInterface {
  constructor(private postMessageService: PostMessageService) {}
  public saveXLIFF(filePath: string, data: IXliff): void {
    const builder = new XliffBuilder({ pretty: true, dontPrettyTextNodes: true });
    const serializedXML = builder.build(data);
    this.postMessageService.sendMessage({ type: 'xliff_write', file: { path: filePath, content: serializedXML } });
  }
}
