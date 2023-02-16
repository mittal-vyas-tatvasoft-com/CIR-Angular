import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from 'src/app/shared/material/shared-material.module';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { RolesComponent } from './components/roles/roles.component';

@NgModule({
  declarations: [
    AddEditRoleComponent,
    RolesComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    SharedModule,
    FormControlModule,
  ],
})
export class RolesModule {}
