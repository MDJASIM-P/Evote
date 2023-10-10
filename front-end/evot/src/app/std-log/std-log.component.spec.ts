import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdLogComponent } from './std-log.component';

describe('StdLogComponent', () => {
  let component: StdLogComponent;
  let fixture: ComponentFixture<StdLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdLogComponent]
    });
    fixture = TestBed.createComponent(StdLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
