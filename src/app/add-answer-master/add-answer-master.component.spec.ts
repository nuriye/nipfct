import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnswerMasterComponent } from './add-answer-master.component';

describe('AddAnswerMasterComponent', () => {
  let component: AddAnswerMasterComponent;
  let fixture: ComponentFixture<AddAnswerMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnswerMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnswerMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
