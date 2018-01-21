import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeuesSpielComponent } from './neues-spiel.component';

describe('NeuesSpielComponent', () => {
  let component: NeuesSpielComponent;
  let fixture: ComponentFixture<NeuesSpielComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeuesSpielComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeuesSpielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
