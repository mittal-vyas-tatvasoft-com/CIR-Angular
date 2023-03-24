import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeekendDialogComponent } from './add-weekend-dialog.component';

describe('AddWeekendDialogComponent', () => {
  let component: AddWeekendDialogComponent;
  let fixture: ComponentFixture<AddWeekendDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWeekendDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWeekendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
