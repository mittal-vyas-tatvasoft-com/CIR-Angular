import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasonsRoutingModule } from './reasons-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { TablesModule } from 'src/app/shared/modules/tables/tables.module';
import { ReasonsComponent } from './components/reasons/reasons.component';

@NgModule({
  declarations: [ReasonsComponent],
  imports: [
    CommonModule,
    ReasonsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule,
    FormControlModule,
    TablesModule,
  ],
})
export class ReasonsModule {}
