import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
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
  public close = new EventEmitter<boolean>();

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['isOpen'] && changes['isOpen'].currentValue) {
      this.isOpen = changes['isOpen'].currentValue;
    }
  }

  public onClose(value: boolean): void {
    this.close.emit(value);
    this.isOpen = false;
  }
}
