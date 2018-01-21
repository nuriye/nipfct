import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatingOrderComponent } from './seating-order.component';

describe('SeatingOrderComponent', () => {
  let component: SeatingOrderComponent;
  let fixture: ComponentFixture<SeatingOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatingOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
