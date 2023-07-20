import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { IXliffFile } from '@vtabary/xliff2js';
import { ElectronService } from '../../../shared/public-api';

@Component({
  selector: 'app-translation-language',
  templateUrl: './translation-language.component.html',
  styleUrls: ['./translation-language.component.scss'],
})
export class TranslationLanguageComponent implements OnChanges {
  @Input()
  public file?: IXliffFile;

  @Output()
  public submitted = new EventEmitter<void>();

  public group: UntypedFormGroup;

  constructor(
    formBuilder: UntypedFormBuilder,
    private electron: ElectronService
  ) {
    this.group = formBuilder.group({
      target: '',
    });
  }

  public ngOnChanges(changes: { file?: SimpleChange }) {
    if (!changes.file) {
      return;
    }

    if (!this.file) {
      return this.group.controls['target'].setValue(null);
    }

    this.group.controls['target'].setValue(
      this.file.$['target-language'] || null
    );
  }

  public goToRFC() {
    this.electron.shell.openExternal(
      'https://docs.sdl.com/LiveContent/content/en-US/SDL_MediaManager_241/concept_A9F20DF9433C46FF8FED8FA11A29FAA0'
    );
  }

  public submit() {
    if (this.file) {
      this.file.$['target-language'] = this.group.controls['target'].value;
    }

    this.group.markAsPristine();
    this.submitted.emit();
  }
}
