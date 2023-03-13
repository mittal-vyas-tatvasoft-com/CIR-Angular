import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from '../../../shared/common/enum';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
    data: { breadCrumb: 'Roles' },
  },
  {
    path: `${Navigation.Add}`,
    component: AddEditRoleComponent,
    data: { breadCrumb: 'Roles/Add' },
  },
  {
    path: `${Navigation.Edit}/:id`,
    component: AddEditRoleComponent,
    data: { breadCrumb: 'Roles/Edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
