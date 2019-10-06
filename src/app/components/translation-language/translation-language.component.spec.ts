import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationLanguageComponent } from './translation-language.component';

describe('TranslationLanguageComponent', () => {
  let component: TranslationLanguageComponent;
  let fixture: ComponentFixture<TranslationLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationLanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationLanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
