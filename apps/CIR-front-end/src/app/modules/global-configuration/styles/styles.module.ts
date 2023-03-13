import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { SharedModule } from '../../../shared/shared.module';
import { StyleListComponent } from './components/style-list/style-list.component';
import { StylesRoutingModule } from './styles-routing.module';

@NgModule({
  declarations: [StyleListComponent],
  imports: [
    CommonModule,
    StylesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlModule,
  ],
})
export class StylesModule {}
