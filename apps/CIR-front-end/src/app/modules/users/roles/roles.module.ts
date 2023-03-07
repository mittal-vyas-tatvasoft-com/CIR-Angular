import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { RolesComponent } from './components/roles/roles.component';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { TablesModule } from '../../../shared/modules/tables/tables.module';

@NgModule({
  declarations: [AddEditRoleComponent, RolesComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule,
    FormControlModule,
    TablesModule,
  ],
})
export class RolesModule {}
