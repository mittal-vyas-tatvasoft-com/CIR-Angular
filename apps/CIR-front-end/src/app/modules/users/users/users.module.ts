import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { TablesModule } from '../../../shared/modules/tables/tables.module';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [AddEditUserComponent, UserListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    FormControlModule,
    TablesModule,
  ],
  exports: [SharedModule],
})
export class UsersModule {}
