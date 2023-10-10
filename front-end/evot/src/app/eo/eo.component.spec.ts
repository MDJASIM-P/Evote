import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EoComponent } from './eo.component';

describe('EoComponent', () => {
  let component: EoComponent;
  let fixture: ComponentFixture<EoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EoComponent]
    });
    fixture = TestBed.createComponent(EoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
