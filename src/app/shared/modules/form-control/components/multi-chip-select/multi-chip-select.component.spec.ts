import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiChipSelectComponent } from './multi-chip-select.component';

describe('MultiChipSelectComponent', () => {
  let component: MultiChipSelectComponent;
  let fixture: ComponentFixture<MultiChipSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiChipSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiChipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
