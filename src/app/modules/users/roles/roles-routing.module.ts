import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from 'src/app/shared/common/enum';
import { AddEditRoleComponent } from './components/add-edit-role/add-edit-role.component';
import { RolesComponent } from './components/roles/roles.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent,
  },
  {
    path: `${Navigation.Add}`,
    component: AddEditRoleComponent,
  },
  {
    path: `${Navigation.Edit}/:id`,
    component: AddEditRoleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}
