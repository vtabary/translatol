import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { FolderTranslationsComponent } from './folder-translations.component';

describe('FolderTranslationsComponent', () => {
  let component: FolderTranslationsComponent;
  let fixture: ComponentFixture<FolderTranslationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FolderTranslationsComponent],
      imports: [SharedModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderTranslationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
