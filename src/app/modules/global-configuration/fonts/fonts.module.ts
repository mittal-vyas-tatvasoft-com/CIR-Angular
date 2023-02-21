import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FontsRoutingModule } from '../fonts/fonts-routing.module';
import { FontsComponent } from '../fonts/components/fonts/fonts.component';
import { FontListComponent } from './components/font-list/font-list.component';
import { AddFontComponent } from './components/add-font/add-font.component';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { TablesModule } from 'src/app/shared/modules/tables/tables.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FontsComponent, FontListComponent, AddFontComponent],
  imports: [
    CommonModule,
    FontsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    FormControlModule,
    TablesModule,
  ],
})
export class FontsModule {}
