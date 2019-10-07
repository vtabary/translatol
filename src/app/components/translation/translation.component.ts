import { cloneDeepWith } from 'lodash';
import {
  IXliffTransUnit,
  IXliffTag,
  IXliffInterpolation,
  IXliffTarget,
  IXliffSource,
  IXliffNote,
} from '@vtabary/xliff2js';
import { Component, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent implements OnChanges {
  @Input()
  public translation: IXliffTransUnit;

  @Output()
  public submitted = new EventEmitter<void>();

  public group: FormGroup;
  public source: IXliffSource;
  public target: IXliffTarget;
  public notes: IXliffNote[];

  constructor(
    private formBuilder: FormBuilder,
    private electron: ElectronService
  ) {
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
  }

  public resetForm() {
    this.group.reset();
  }

  public submit() {
    this.source.children.forEach((value, index) => {
      if (typeof value !== 'string') {
        return this.target.children[index] = value;
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
      this.group.controls[ 'target-' + index ].setValue(value);
    });
    this.group.markAsDirty();
  }

  public copy(filePath: string, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.electron.clipboard.writeText(filePath, 'clipboard');
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
    const children = this.translation.children.filter(child => child.name === name);
    return children || [];
  }
}
