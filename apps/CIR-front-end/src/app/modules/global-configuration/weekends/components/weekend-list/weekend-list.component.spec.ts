import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekendListComponent } from './weekend-list.component';

describe('WeekendListComponent', () => {
  let component: WeekendListComponent;
  let fixture: ComponentFixture<WeekendListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekendListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekendListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
