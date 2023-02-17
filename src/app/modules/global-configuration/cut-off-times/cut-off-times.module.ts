import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutOffTimesRoutingModule } from './cut-off-times-routing.module';
import { CutOffTimesComponent } from './components/cut-off-times/cut-off-times.component';


@NgModule({
  declarations: [
    CutOffTimesComponent
  ],
  imports: [
    CommonModule,
    CutOffTimesRoutingModule
  ]
})
export class CutOffTimesModule { }
