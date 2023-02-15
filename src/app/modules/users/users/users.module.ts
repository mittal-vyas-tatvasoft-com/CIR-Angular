import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { UserListComponent } from './components/user-list/user-list.component';


@NgModule({
  declarations: [
    AddEditUserComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
