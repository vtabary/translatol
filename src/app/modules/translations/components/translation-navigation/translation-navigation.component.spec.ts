import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslationNavigationComponent } from './translation-navigation.component';

describe('TranslationNavigationComponent', () => {
  let component: TranslationNavigationComponent;
  let fixture: ComponentFixture<TranslationNavigationComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TranslationNavigationComponent],
        imports: [BrowserAnimationsModule, ClarityModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
