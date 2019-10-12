import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationListComponent } from './translation-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TranslationListComponent', () => {
  let component: TranslationListComponent;
  let fixture: ComponentFixture<TranslationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationListComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
