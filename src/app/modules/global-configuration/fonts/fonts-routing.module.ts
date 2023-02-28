import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontsComponent } from '../fonts/components/fonts/fonts.component';
import { AddFontComponent } from './components/add-font/add-font.component';

const routes: Routes = [
  { path: '', component: FontsComponent },
  { path: 'add-font', component: AddFontComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FontsRoutingModule {}
