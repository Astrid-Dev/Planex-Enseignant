import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivityDetailsComponent } from './modal-activity-details.component';

describe('ModalActivityDetailsComponent', () => {
  let component: ModalActivityDetailsComponent;
  let fixture: ComponentFixture<ModalActivityDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActivityDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalActivityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
