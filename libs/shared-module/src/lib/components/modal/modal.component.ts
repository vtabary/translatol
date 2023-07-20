import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
} from '@angular/core';

@Component({
  selector: 'translatol-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnChanges {
  @Input()
  public isOpen = false;

  @Input()
  public title = '';

  @Input()
  public message = '';

  @Input()
  public buttonLabel = 'Confirm';

  @Output()
  public closeModal = new EventEmitter<boolean>();

  public ngOnChanges(changes: {
    isOpen?: SimpleChange;
    title?: SimpleChange;
    message?: SimpleChange;
    buttonLabel?: SimpleChange;
  }) {
    if (changes.isOpen?.currentValue) {
      this.isOpen = changes.isOpen.currentValue;
    }
  }

  public onClose(value: boolean): void {
    this.closeModal.emit(value);
    this.isOpen = false;
  }
}
