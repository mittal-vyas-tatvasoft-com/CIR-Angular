import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { TablesModule } from '../../../shared/modules/tables/tables.module';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { WeekendsRoutingModule } from './weekends-routing.module';
import { WeekendListComponent } from './components/weekend-list/weekend-list.component';
import { AddWeekendDialogComponent } from './components/add-weekend-dialog/add-weekend-dialog.component';

@NgModule({
  declarations: [WeekendListComponent, AddWeekendDialogComponent],
  imports: [
    CommonModule,
    WeekendsRoutingModule,
    SharedModule,
    SharedMaterialModule,
    FormControlModule,
    ReactiveFormsModule,
    TablesModule,
  ],
})
export class WeekendsModule {}
