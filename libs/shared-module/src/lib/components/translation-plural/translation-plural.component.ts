import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';

@Component({
  selector: 'translatol-translation-plural',
  templateUrl: './translation-plural.component.html',
  styleUrls: ['./translation-plural.component.scss'],
})
export class TranslationPluralComponent implements OnChanges {
  @Input()
  public source?: IXliffPlural;

  @Input()
  public target?: string | IXliffPlural | IXliffInterpolation;

  @Input()
  public targetLanguage?: string;

  /**
   * @internal
   */
  public pluralCountersKey?: string[];

  /**
   * @internal
   */
  public ngOnChanges(changes: {
    source?: SimpleChange;
    target?: SimpleChange;
  }) {
    if (changes.source) {
      this.pluralCountersKey = Object.keys(this.source?.counters ?? {});
    }
  }
}
