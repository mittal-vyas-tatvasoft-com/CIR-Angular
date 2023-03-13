import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LookupsListComponent } from './lookups-list.component';

describe('LookupsListComponent', () => {
  let component: LookupsListComponent;
  let fixture: ComponentFixture<LookupsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LookupsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LookupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
