import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleDaysComponent } from './multiple-days.component';

describe('MultipleDaysComponent', () => {
  let component: MultipleDaysComponent;
  let fixture: ComponentFixture<MultipleDaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleDaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
