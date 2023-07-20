import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslationDuplicatedListComponent } from './translation-duplicated-list.component';

describe('TranslationDuplicatedListComponent', () => {
  let component: TranslationDuplicatedListComponent;
  let fixture: ComponentFixture<TranslationDuplicatedListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationDuplicatedListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationDuplicatedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
