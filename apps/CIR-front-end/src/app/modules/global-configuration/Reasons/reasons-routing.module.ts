import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReasonsComponent } from './components/reasons/reasons.component';

const routes: Routes = [
  {
    path: '',
    component: ReasonsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasonsRoutingModule {}
