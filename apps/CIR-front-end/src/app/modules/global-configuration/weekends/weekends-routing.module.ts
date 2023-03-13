import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeekendListComponent } from './components/weekend-list/weekend-list.component';

const routes: Routes = [{ path: '', component: WeekendListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeekendsRoutingModule {}
