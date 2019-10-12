import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { NgxElectronModule } from 'ngx-electron';

import { TranslationLanguageComponent } from './translation-language.component';

describe('TranslationLanguageComponent', () => {
  let component: TranslationLanguageComponent;
  let fixture: ComponentFixture<TranslationLanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationLanguageComponent ],
      imports: [
        ReactiveFormsModule,
        ClarityModule,
        NgxElectronModule,
      ],
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
