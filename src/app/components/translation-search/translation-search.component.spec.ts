import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationSearchComponent } from './translation-search.component';

describe('TranslationSearchComponent', () => {
  let component: TranslationSearchComponent;
  let fixture: ComponentFixture<TranslationSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
