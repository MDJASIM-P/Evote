import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdRegComponent } from './std-reg.component';

describe('StdRegComponent', () => {
  let component: StdRegComponent;
  let fixture: ComponentFixture<StdRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StdRegComponent]
    });
    fixture = TestBed.createComponent(StdRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
