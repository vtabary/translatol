import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { IXliffInterpolation, IXliffPlural } from '@vtabary/xliff2js';

// TODO duplication de TranslationItemComponent a supprimer
@Component({
  selector: 'app-translation-plural-item',
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
  public group?: UntypedFormGroup;

  @Input()
  public targetLanguage?: string;

  public control?: UntypedFormControl;
  public text?: string;
  public interpolation?: IXliffInterpolation;

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnChanges(): void {
    if (!this.source) {
      return;
    }

    if (typeof this.source === 'string') {
      this.text = this.source;
    } else if (this.source.name !== 'plural') {
      this.interpolation = this.source;
    }

    if (!this.text) {
      return;
    }

    // Display the target only if the target is a string (could be an object from a previous edition)
    const target = typeof this.target === 'string' ? this.target : '';
    this.group.addControl(this.id, this.formBuilder.control(target));
  }

  public ngOnDestroy(): void {
    if (!this.group || !this.group.contains(this.id)) {
      return;
    }

    this.group.removeControl(this.id);
  }
}
