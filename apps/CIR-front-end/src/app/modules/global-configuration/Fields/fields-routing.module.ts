import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from '../../../shared/common/enum';
import { AddEditFieldsComponent } from './components/add-edit-field/add-edit-field.component';
import { FieldsComponent } from './components/field-list/field-list.component';

const routes: Routes = [
  {
    path: '',
    component: FieldsComponent,
  },
  {
    path: `${Navigation.Add}`,
    component: AddEditFieldsComponent,
  },
  {
    path: `${Navigation.Edit}/:id`,
    component: AddEditFieldsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FieldsRoutingModule {}
