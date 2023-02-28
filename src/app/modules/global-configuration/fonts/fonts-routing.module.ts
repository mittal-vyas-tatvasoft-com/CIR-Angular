import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from 'src/app/shared/common/enum';
import { FontsComponent } from '../fonts/components/fonts/fonts.component';
import { AddFontComponent } from './components/add-font/add-font.component';

const routes: Routes = [
  {
    path: '',
    component: FontsComponent,
    data: { breadCrumb: 'Fonts' },
  },
  {
    path: `${Navigation.Add}`,
    component: AddFontComponent,
    data: { breadCrumb: 'Fonts/Add' },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FontsRoutingModule {}
