import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IXliffPlural } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-plural',
  templateUrl: './translation-plural.component.html',
  styleUrls: ['./translation-plural.component.scss'],
})
export class TranslationPluralComponent implements OnChanges {
  @Input()
  public plural: IXliffPlural;

  @Input()
  public target: IXliffPlural;

  @Input()
  public group: UntypedFormGroup;

  @Input()
  public targetLanguage: string;

  public pluralCountersKey: string[];

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.plural) {
      this.pluralCountersKey = Object.keys(this.plural.counters);
    }
  }
}
