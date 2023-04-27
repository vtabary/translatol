import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { IXliffInterpolation } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss'],
})
export class TranslationItemComponent implements OnChanges, OnDestroy {
  @Input()
  public source: string | IXliffInterpolation;

  @Input()
  public target: string | IXliffInterpolation;

  @Input()
  public id: string;

  @Input()
  public group: UntypedFormGroup;

  @Input()
  public sourceLanguage: string;

  @Input()
  public targetLanguage: string;

  public control: UntypedFormControl;
  public text: string;
  public interpolation: IXliffInterpolation;

  constructor(private formBuilder: UntypedFormBuilder) {}

  public ngOnChanges() {
    if (!this.source) {
      return;
    }

    if (typeof this.source === 'string') {
      this.text = this.source;
    } else {
      this.interpolation = this.source;
    }

    if (!this.text) {
      return;
    }

    // Display the target only if the target is a string (could be an object from a previous edition)
    const target = typeof this.target === 'string' ? this.target.trim() : '';
    this.group.addControl(this.id, this.formBuilder.control(target));
  }

  public ngOnDestroy() {
    if (!this.group || !this.group.contains(this.id)) {
      return;
    }

    this.group.removeControl(this.id);
  }
}
