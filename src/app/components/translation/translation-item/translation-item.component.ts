import { Component, Input, SimpleChanges, OnChanges, OnDestroy } from '@angular/core';
import { IXliffInterpolation, IXliffSource } from '@vtabary/xliff2js';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-translation-item',
  templateUrl: './translation-item.component.html',
  styleUrls: ['./translation-item.component.scss']
})
export class TranslationItemComponent implements OnChanges, OnDestroy {
  @Input()
  public source: IXliffSource;

  @Input()
  public target: IXliffSource;

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
    this.group.addControl(this.id, this.formBuilder.control(this.target));
  }

  public ngOnDestroy() {
    this.group.removeControl(this.id);
  }
}
