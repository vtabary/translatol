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

  public control: FormControl;
  public text: string;
  public interpolation: IXliffInterpolation;

  constructor(
    private formBuilder: FormBuilder
  ) {}

  public ngOnChanges(changes: SimpleChanges) {
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

    this.group.addControl(this.id, this.formBuilder.control((this.target ? this.target as string : '').trim()));
  }

  public ngOnDestroy() {
    this.group.removeControl(this.id);
  }
}
