import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeekendsRoutingModule } from './weekends-routing.module';
import { WeekendListComponent } from './components/weekend-list/weekend-list.component';


@NgModule({
  declarations: [
    WeekendListComponent
  ],
  imports: [
    CommonModule,
    WeekendsRoutingModule
  ]
})
export class WeekendsModule { }
