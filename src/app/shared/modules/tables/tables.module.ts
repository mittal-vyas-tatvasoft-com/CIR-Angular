import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableWithoutFilterComponent } from 'src/app/shared/modules/tables/components/table-without-filter/table-without-filter.component';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { SharedModule } from '../../shared.module';
import { FormControlModule } from '../form-control/form-control.module';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [TableComponent, TableWithoutFilterComponent],
  exports: [TableComponent, TableWithoutFilterComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    FormControlModule,
    SharedModule,
  ],
})
export class TablesModule {}
