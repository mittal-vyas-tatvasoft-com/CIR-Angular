import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEditFieldsComponent } from './add-edit-field.component';

describe('AddEditFieldsComponent', () => {
  let component: AddEditFieldsComponent;
  let fixture: ComponentFixture<AddEditFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditFieldsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
