import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffhomeComponent } from './staffhome.component';

describe('StaffhomeComponent', () => {
  let component: StaffhomeComponent;
  let fixture: ComponentFixture<StaffhomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StaffhomeComponent]
    });
    fixture = TestBed.createComponent(StaffhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
