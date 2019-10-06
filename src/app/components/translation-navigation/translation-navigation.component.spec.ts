import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationNavigationComponent } from './translation-navigation.component';

describe('TranslationNavigationComponent', () => {
  let component: TranslationNavigationComponent;
  let fixture: ComponentFixture<TranslationNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
