import {
  IXliffTransUnit,
  IXliffTag,
  IXliffTarget,
  IXliffSource,
  IXliffNote,
} from '@vtabary/xliff2js';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss'],
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

  constructor(private formBuilder: UntypedFormBuilder) {
    this.group = this.formBuilder.group({});
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['translation']) {
      return;
    }

    if (!this.translation) {
      return this.group.controls['target'].setValue(null);
    }

    this.source = this.getSource();
    this.target = this.getTarget();
    this.notes = this.getNotes();
  }

  public resetForm() {
    this.group.reset();
  }

  public submit() {
    this.source.children.forEach((value, index) => {
      if (typeof value !== 'string') {
        this.target.children[index] = value;
        return;
      }

      this.target.children[index] =
        this.group.controls['target-' + index].value;
    });

    this.target.$.state = 'translated';

    // Remove the current target in order to replace it by the new one
    this.translation.children = this.translation.children.filter(
      (item) => item !== this.target
    );
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
}
