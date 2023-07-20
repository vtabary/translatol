import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'translatol-translation-search',
  templateUrl: './translation-search.component.html',
  styleUrls: ['./translation-search.component.scss'],
})
export class TranslationSearchComponent {
  /**
   * @internal
   */
  public searchControl = new FormControl('', { updateOn: 'change' });

  @Output()
  public changed = new EventEmitter<string>();

  private subscriptions = new Subscription();

  /**
   * @internal
   */
  public ngOnInit(): void {
    const subscription = this.searchControl.valueChanges
      .pipe(
        map((text) => text ?? ''),
        debounceTime(150)
      )
      .subscribe((text) => {
        this.changed.emit(text);
      });

    this.subscriptions.add(subscription);
  }

  /**
   * @internal
   */
  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
