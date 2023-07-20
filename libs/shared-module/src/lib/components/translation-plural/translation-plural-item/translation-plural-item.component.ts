import { Component, Inject, Input, OnChanges, OnDestroy } from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroupDirective,
  UntypedFormControl,
} from '@angular/forms';
import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';

// TODO duplication de TranslationItemComponent a supprimer
@Component({
  selector: 'translatol-translation-plural-item',
  templateUrl: './translation-plural-item.component.html',
  styleUrls: ['./translation-plural-item.component.scss'],
})
export class TranslationPluralItemComponent implements OnChanges, OnDestroy {
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
  /**
   * @internal
   */

  public formControl?: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ControlContainer)
    public controlContainer: FormGroupDirective
  ) {}

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
      this.formControl = this.formBuilder.control(target, {
        nonNullable: true,
      });
      this.controlContainer.form?.setControl(this.id, this.formControl);
    }
  }

  /**
   * @internal
   */
  public ngOnDestroy(): void {
    if (!this.id) {
      return;
    }

    this.controlContainer.form.removeControl(this.id);
  }
}
