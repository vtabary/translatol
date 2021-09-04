import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TranslationSearchComponent } from './translation-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

describe('TranslationSearchComponent', () => {
  let component: TranslationSearchComponent;
  let fixture: ComponentFixture<TranslationSearchComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TranslationSearchComponent],
        imports: [ReactiveFormsModule, ClarityModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
