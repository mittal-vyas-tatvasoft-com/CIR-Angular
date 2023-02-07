import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerpageComponent } from './innerpage.component';

describe('InnerpageComponent', () => {
  let component: InnerpageComponent;
  let fixture: ComponentFixture<InnerpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnerpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
