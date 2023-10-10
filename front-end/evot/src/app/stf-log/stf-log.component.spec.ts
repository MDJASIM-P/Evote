import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StfLogComponent } from './stf-log.component';

describe('StfLogComponent', () => {
  let component: StfLogComponent;
  let fixture: ComponentFixture<StfLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StfLogComponent]
    });
    fixture = TestBed.createComponent(StfLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
