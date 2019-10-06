import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenerComponent } from './opener.component';

describe('OpenerComponent', () => {
  let component: OpenerComponent;
  let fixture: ComponentFixture<OpenerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
