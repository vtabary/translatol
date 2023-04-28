import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IXliffInterpolation, IXliffNote, IXliffSource, IXliffTag, IXliffTarget, IXliffTransUnit, IXliffPlural } from '@vtabary/xliff2js';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
})
export class TranslationComponent implements OnChanges {
  @Input()
  public translation: IXliffTransUnit;

  @Input()
  public sourceLanguage: string;

  @Input()
  public targetLanguage: string;

  @Output()
  public submitted = new EventEmitter<void>();

  public group: UntypedFormGroup;
  public source: IXliffSource;
  public target: IXliffTarget;
  public notes: IXliffNote[];
  public isPlural = false;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.group = this.formBuilder.group({});
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.translation) {
      return;
    }

    if (!this.translation) {
      return this.group.controls.target.setValue(null);
    }

    this.source = this.getSource();
    this.target = this.getTarget();
    this.notes = this.getNotes();
    this.isPlural = this.source.children.some(child => (child as any).name === 'plural');
  }

  public resetForm() {
    this.group.reset();
  }

  public submit() {
    this.source.children.forEach((value: string | IXliffInterpolation | IXliffPlural, index) => {
      if ((value as any).name === 'plural') {
        this.handlePluralSubmit(value, index);
        return;
      }

      if (typeof value !== 'string') {
        this.target.children[index] = value;
        return;
      }

      this.target.children[index] = this.group.controls['target-' + index].value;
    });

    this.target.$.state = 'translated';

    // Remove the current target in order to replace it by the new one
    this.translation.children = this.translation.children.filter(item => item !== this.target);
    this.translation.children.push(this.target);

    this.group.markAsPristine();
    this.submitted.emit();
  }

  public copySource() {
    this.source.children.forEach((value, index) => {
      this.group.controls['target-' + index].setValue(value);
    });
    this.group.markAsDirty();
  }

  private getSource(): IXliffSource {
    return this.getChildren('source')[0] as IXliffSource;
  }

  private getTarget(): IXliffTarget {
    const target = this.getChildren('target')[0] as IXliffTarget;
    if (!target) {
      return {
        $: {},
        children: [],
        name: 'target',
      };
    }

    return target;
  }

  private getNotes(): IXliffNote[] {
    return this.getChildren('note') as IXliffNote[];
  }

  private getChildren(name: 'source' | 'target' | 'note'): (string | IXliffTag)[] {
    if (!this.translation) {
      return [];
    }

    const children = this.translation.children.filter(child => child.name === name);
    return children || [];
  }

  private handlePluralSubmit(value: string | IXliffInterpolation | IXliffPlural, index: number): void {
    const pluralCounters = (value as IXliffPlural).counters;

    Object.keys(pluralCounters).forEach(key => {
      pluralCounters[key].forEach((trad, indexTrad) => {
        if (typeof trad !== 'string') {
          return ((this.target.children[index] as any).counters[key][indexTrad] = trad);
        }

        (this.target.children[index] as any).counters[key][indexTrad] = this.group.controls['target-plural-' + key + '-' + indexTrad].value;
      });
    });
  }
}
