import { Component, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { IXliffInterpolation } from '@vtabary/xliff2js';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss']
})
export class TranslationItemComponent implements OnChanges, OnDestroy {
  @Input()
  public source: string | IXliffInterpolation;

  @Input()
  public target: string | IXliffInterpolation;

  @Input()
  public id: string;

  @Input()
  public group: FormGroup;

  public type: 'interpolation' | 'string';
  public control: FormControl;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (!this.source) {
      return;
    }

    this.type = typeof this.source === 'string' ? 'string' : 'interpolation';

    if (this.type !== 'string') {
      return;
    }

    this.group.addControl(this.id, this.formBuilder.control((this.target ? this.target as string : '').trim()));
  }

  public ngOnDestroy() {
    this.group.removeControl(this.id);
  }
}
