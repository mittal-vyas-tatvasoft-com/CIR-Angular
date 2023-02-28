import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldsRoutingModule } from './fields-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditFieldsComponent } from './components/add-edit-field/add-edit-field.component';
import { FieldsComponent } from './components/field-list/field-list.component';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { TablesModule } from 'src/app/shared/modules/tables/tables.module';

@NgModule({
  declarations: [AddEditFieldsComponent, FieldsComponent],
  imports: [
    CommonModule,
    FieldsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule,
    FormControlModule,
    TablesModule,
  ],
})
export class FieldsModule {}
