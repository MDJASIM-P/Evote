import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteridComponent } from './voterid.component';

describe('VoteridComponent', () => {
  let component: VoteridComponent;
  let fixture: ComponentFixture<VoteridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoteridComponent]
    });
    fixture = TestBed.createComponent(VoteridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
