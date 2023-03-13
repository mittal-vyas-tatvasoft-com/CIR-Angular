import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { FontsRoutingModule } from '../fonts/fonts-routing.module';
import { FontsComponent } from './components/fonts/fonts.component';
import { FontListComponent } from './components/font-list/font-list.component';
import { AddFontComponent } from './components/add-font/add-font.component';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { TablesModule } from '../../../shared/modules/tables/tables.module';
import { CoreModule } from '../../../core/core.module';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';

@NgModule({
  declarations: [FontsComponent, FontListComponent, AddFontComponent],
  imports: [
    CommonModule,
    FontsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SharedMaterialModule,
    TablesModule,
    CoreModule,
    FormControlModule,
  ],
})
export class FontsModule {}
