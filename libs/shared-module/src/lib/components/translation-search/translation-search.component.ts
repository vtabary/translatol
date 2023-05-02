import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-translation-search',
  templateUrl: './translation-search.component.html',
  styleUrls: ['./translation-search.component.scss'],
})
export class TranslationSearchComponent {
  @Output()
  public changed = new EventEmitter<string>();

  public group: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.group = this.formBuilder.group({
      text: '',
    });
  }

  public submit() {
    this.changed.emit(this.group.controls['text'].value);
  }
}
