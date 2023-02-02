import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableWithFilterComponent } from './components/table-with-filter/table-with-filter.component';
import { TablesModule } from '../shared/modules/tables/tables.module';
import { FormControlModule } from '../shared/modules/form-control/form-control.module';
import { SharedMaterialModule } from '../shared/material/shared-material.module';
import { TableDemoRoutingModule } from './table-demo-routing';

@NgModule({
  declarations: [
    TableWithFilterComponent,
  ],
  imports: [
    CommonModule,
    TablesModule,
    FormControlModule,
    SharedMaterialModule,
    TableDemoRoutingModule
  ]
})
export class TableDemoModule { }
