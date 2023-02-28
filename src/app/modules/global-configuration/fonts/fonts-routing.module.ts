import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontsComponent } from '../fonts/components/fonts/fonts.component';

const routes: Routes = [
  {
    path: '',
    component: FontsComponent,
    data: { breadCrumb: 'Fonts' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FontsRoutingModule {}
