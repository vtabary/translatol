import { Component, Inject, Input, OnChanges, OnDestroy } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroupDirective,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';

@Component({
  selector: 'translatol-translation-item-simple',
  templateUrl: './translation-item-simple.component.html',
  styleUrls: ['./translation-item-simple.component.scss'],
})
export class TranslationItemSimpleComponent implements OnChanges, OnDestroy {
  @Input()
  public source?: string;

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
  public formControl?: FormControl;

  constructor(
    private formBuilder: UntypedFormBuilder,
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
