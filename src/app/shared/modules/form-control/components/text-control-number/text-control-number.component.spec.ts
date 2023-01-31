import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextControlNumberComponent } from './text-control-number.component';

describe('TextControlNumberComponent', () => {
  let component: TextControlNumberComponent;
  let fixture: ComponentFixture<TextControlNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextControlNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextControlNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
