import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableWithFilterComponent } from './components/table-with-filter/table-with-filter.component';

const routes: Routes = [
  {
    path: '',
    component: TableWithFilterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TableDemoRoutingModule {}