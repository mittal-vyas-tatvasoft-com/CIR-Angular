import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayListComponent } from './holiday-list/holiday-list.component';
import { AddEditHolidayComponent } from './add-edit-holiday/add-edit-holiday.component';



@NgModule({
  declarations: [
    HolidayListComponent,
    AddEditHolidayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HolidaysModule { }
