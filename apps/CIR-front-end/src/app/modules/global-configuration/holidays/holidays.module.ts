import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HolidayListComponent } from '../holidays/components/holiday-list/holiday-list.component';
import { AddEditHolidayComponent } from '../holidays/components/add-edit-holiday/add-edit-holiday.component';

@NgModule({
  declarations: [HolidayListComponent, AddEditHolidayComponent],
  imports: [CommonModule],
})
export class HolidaysModule {}
