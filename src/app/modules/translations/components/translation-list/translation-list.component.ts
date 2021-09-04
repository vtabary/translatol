import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IXliffTransUnit } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-list',
  templateUrl: './translation-list.component.html',
  styleUrls: ['./translation-list.component.scss']
})
export class TranslationListComponent {
  @Input()
  public translations: IXliffTransUnit[] = [];

  @Input()
  public listTitle: string;

  @Input()
  public sourceLanguage: string;

  @Input()
  public targetLanguage: string;

  @Output()
  public submitted = new EventEmitter<void>();
}
