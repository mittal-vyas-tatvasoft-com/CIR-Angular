import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupItemsComponent } from './lookup-items.component';

describe('LookupItemsComponent', () => {
  let component: LookupItemsComponent;
  let fixture: ComponentFixture<LookupItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
