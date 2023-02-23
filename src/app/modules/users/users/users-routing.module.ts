import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from 'src/app/shared/common/enum';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    data: { breadcrumb: 'Users' },
    // data: { privilegeId: Permissions.USER_LIST },
  },
  {
    path: `${Navigation.Add}`,
    component: AddEditUserComponent,
    //data: { privilegeId: Permissions.USER_CREATE },
  },
  {
    path: `${Navigation.Edit}/:id`,
    component: AddEditUserComponent,
    //data: { privilegeId: Permissions.USER_EDIT },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
