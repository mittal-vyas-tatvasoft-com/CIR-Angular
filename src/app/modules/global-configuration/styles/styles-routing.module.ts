import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StyleListComponent } from './components/style-list/style-list.component';

const routes: Routes = [{ path: '', component: StyleListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StylesRoutingModule { }
