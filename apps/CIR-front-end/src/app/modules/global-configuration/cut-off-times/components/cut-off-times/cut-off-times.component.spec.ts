import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CutOffTimesComponent } from './cut-off-times.component';

describe('CutOffTimesComponent', () => {
  let component: CutOffTimesComponent;
  let fixture: ComponentFixture<CutOffTimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CutOffTimesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CutOffTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
