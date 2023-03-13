import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CutOffTimesRoutingModule } from './cut-off-times-routing.module';
import { CutOffTimesComponent } from './components/cut-off-times/cut-off-times.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [CutOffTimesComponent],
  imports: [
    CommonModule,
    CutOffTimesRoutingModule,
    SharedModule,
    FormControlModule,
    SharedMaterialModule,
    ReactiveFormsModule,
  ],
})
export class CutOffTimesModule {}
