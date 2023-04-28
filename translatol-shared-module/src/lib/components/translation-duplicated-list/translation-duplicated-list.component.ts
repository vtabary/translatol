import { Component, Input } from '@angular/core';
import { IXliffTransUnit } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-duplicated-list',
  templateUrl: './translation-duplicated-list.component.html',
  styleUrls: ['./translation-duplicated-list.component.scss'],
})
export class TranslationDuplicatedListComponent {
  @Input()
  public translations: IXliffTransUnit[] = [];

  @Input()
  public listTitle: string;
}
