import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CutOffTimesComponent } from './components/cut-off-times/cut-off-times.component';

const routes: Routes = [
  {
    path: '',
    component: CutOffTimesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CutOffTimesRoutingModule {}
