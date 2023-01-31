import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppControlsComponent } from './component/app-controls.component';

const routes: Routes = [
  {
    path: '',
    component: AppControlsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppControlsRoutingModule {}
