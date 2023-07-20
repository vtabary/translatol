import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  IXliffInterpolation,
  IXliffNote,
  IXliffPlural,
  IXliffSource,
  IXliffTag,
  IXliffTarget,
  IXliffTransUnit,
} from '@vtabary/xliff2js';
import { isXliffPlural } from '../../functions/xliff';

@Component({
  selector: 'translatol-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
})
export class TranslationComponent implements OnChanges {
  @Input()
  public translation?: IXliffTransUnit;

  @Input()
  public sourceLanguage?: string;

  @Input()
  public targetLanguage?: string;

  @Output()
  public submitted = new EventEmitter<void>();

  /**
   * @internal
   */
  public group: FormGroup;
  /**
   * @internal
   */
  public source?: IXliffSource;
  /**
   * @internal
   */
  public target?: IXliffTarget;
  /**
   * @internal
   */
  public notes?: IXliffNote[];
  /**
   * @internal
   */
  public isPlural = false;

  constructor(private formBuilder: FormBuilder) {
    this.group = this.formBuilder.group({});
  }

  /**
   * @internal
   */
  public ngOnChanges(changes: {
    translation: SimpleChange;
    sourceLanguage: SimpleChange;
    targetLanguage: SimpleChange;
  }): void {
    if (!changes.translation) {
      return;
    }

    if (!this.translation) {
      return this.group.controls['target'].setValue(null);
    }

    this.source = this.getSource();
    this.target = this.getTarget();
    this.notes = this.getNotes();
    this.isPlural = this.source.children.some(
      (child) => (child as IXliffPlural).name === 'plural'
    );
  }

  public resetForm() {
    this.group.reset();
  }

  public save() {
    this.source?.children.forEach(
      (value: string | IXliffInterpolation | IXliffPlural, index) => {
        if (isXliffPlural(value)) {
          this.handlePluralSubmit(value, index);
          return;
        }

        if (!this.target) {
          return;
        }

        if (typeof value !== 'string') {
          this.target.children[index] = value;
          return;
        }

        this.target.children[index] =
          this.group.controls['target-' + index].value;
      }
    );

    if (this.target) {
      this.target.$.state = 'translated';
    }

    if (!this.translation) {
      return;
    }

    // Remove the current target in order to replace it by the new one
    this.translation.children = this.translation.children.filter(
      (item) => item !== this.target
    );

    if (this.target) {
      this.translation.children.push(this.target);
    }

    this.group.markAsPristine();
    this.submitted.emit();
  }

  public copySource() {
    this.source?.children.forEach((value, index) => {
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

  private getChildren(
    name: 'source' | 'target' | 'note'
  ): (string | IXliffTag)[] {
    if (!this.translation) {
      return [];
    }

    const children = this.translation.children.filter(
      (child) => child.name === name
    );
    return children || [];
  }

  private handlePluralSubmit(value: IXliffPlural, index: number): void {
    const pluralCounters = value.counters;

    Object.keys(pluralCounters).forEach((key) => {
      pluralCounters[key].forEach((trad, indexTrad) => {
        const plural = this.target?.children[index];
        if (!isXliffPlural(plural)) {
          return;
        }

        if (typeof trad !== 'string') {
          plural.counters[key][indexTrad] = trad;
          return;
        }

        plural.counters[key][indexTrad] =
          this.group.controls['target-plural-' + key + '-' + indexTrad].value;
      });
    });
  }
}
