import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss'],
})
export class TranslationItemComponent implements OnChanges, OnDestroy {
  @Input()
  public source?: string | IXliffInterpolation | IXliffPlural;

  @Input()
  public target?: string | IXliffInterpolation | IXliffPlural;

  @Input()
  public id?: string;

  @Input()
  public group?: UntypedFormGroup;

  @Input()
  public targetLanguage?: string;

  /**
   * @internal
   */
  public control?: UntypedFormControl;
  /**
   * @internal
   */
  public text?: string;
  /**
   * @internal
   */
  public interpolation?: IXliffInterpolation;
  /**
   * @internal
   */
  public plural?: IXliffPlural;
  /**
   * @internal
   */
  public pluralTarget?: IXliffPlural;

  constructor(private formBuilder: UntypedFormBuilder) {}

  /**
   * @internal
   */
  public ngOnChanges(): void {
    if (!this.source) {
      return;
    }

    if (typeof this.source === 'string') {
      this.text = this.source;
    } else if (this.source.name === 'plural') {
      this.plural = this.source;
      this.pluralTarget = this.target as IXliffPlural;
    } else {
      this.interpolation = this.source;
    }

    if (!this.text) {
      return;
    }

    // Display the target only if the target is a string (could be an object from a previous edition)
    const target = typeof this.target === 'string' ? this.target : '';
    if (this.id) {
      this.group?.addControl(this.id, this.formBuilder.control(target));
    }
  }

  /**
   * @internal
   */
  public ngOnDestroy(): void {
    if (!this.id) {
      return;
    }

    if (!this.group || !this.group.contains(this.id)) {
      return;
    }

    this.group.removeControl(this.id);
  }
}
