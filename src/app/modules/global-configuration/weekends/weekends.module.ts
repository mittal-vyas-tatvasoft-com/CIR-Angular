import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekendsRoutingModule } from './weekends-routing.module';
import { WeekendListComponent } from './components/weekend-list/weekend-list.component';
import { TablesModule } from 'src/app/shared/modules/tables/tables.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { ReactiveFormsModule } from '@angular/forms';
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
