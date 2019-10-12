import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationItemComponent } from './translation-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';

describe('TranslationItemComponent', () => {
  let component: TranslationItemComponent;
  let fixture: ComponentFixture<TranslationItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationItemComponent ],
      imports: [
        ReactiveFormsModule,
        ClarityModule,
      ],
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
