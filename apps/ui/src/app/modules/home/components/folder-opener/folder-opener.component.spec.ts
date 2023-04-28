import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClarityModule } from '@clr/angular';
import { SharedModule } from '../../../shared/shared.module';
import { FolderOpenerComponent } from './folder-opener.component';

describe('FolderOpenerComponent', () => {
  let component: FolderOpenerComponent;
  let fixture: ComponentFixture<FolderOpenerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FolderOpenerComponent],
      imports: [SharedModule, RouterTestingModule, ClarityModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolderOpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
