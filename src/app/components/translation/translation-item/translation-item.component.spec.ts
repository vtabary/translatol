import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationItemComponent } from './translation-item.component';

describe('TranslationItemComponent', () => {
  let component: TranslationItemComponent;
  let fixture: ComponentFixture<TranslationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
