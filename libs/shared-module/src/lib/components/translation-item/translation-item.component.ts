import { Component, Input } from '@angular/core';
import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';
import {
  isXliffInterpolation,
  isXliffPlural,
  isXliffString,
} from '../../functions/xliff';

@Component({
  selector: 'translatol-translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss'],
})
export class TranslationItemComponent {
  @Input()
  public source?: string | IXliffInterpolation | IXliffPlural;

  @Input()
  public target?: string | IXliffInterpolation | IXliffPlural;

  @Input()
  public id?: string;

  @Input()
  public targetLanguage?: string;

  /**
   * @internal
   */
  public isXliffString(
    value: string | IXliffPlural | IXliffInterpolation | undefined
  ): value is string {
    return isXliffString(value);
  }

  /**
   * @internal
   */
  public isXliffPlural(
    value: string | IXliffPlural | IXliffInterpolation | undefined
  ): value is IXliffPlural {
    return isXliffPlural(value);
  }

  /**
   * @internal
   */
  public isXliffInterpolation(
    value: string | IXliffPlural | IXliffInterpolation | undefined
  ): value is IXliffInterpolation {
    return isXliffInterpolation(value);
  }
}
