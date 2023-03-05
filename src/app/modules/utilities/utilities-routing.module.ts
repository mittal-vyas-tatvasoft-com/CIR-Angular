import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from 'src/app/shared/common/enum';
import { AddEditLookupComponent } from './lookup/components/add-edit-lookup/add-edit-lookup.component';

const routes: Routes = [
  {
    path: `${Navigation.Add}/:code`,
    component: AddEditLookupComponent,
  },
  {
    path: `${Navigation.Add}/:code/:cultId/:codeId`,
    component: AddEditLookupComponent,
  },
  { path: `${Navigation.Edit}/:id`, component: AddEditLookupComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilitiesRoutingModule {}
