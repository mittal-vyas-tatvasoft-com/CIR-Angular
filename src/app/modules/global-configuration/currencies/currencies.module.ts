import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { TablesModule } from 'src/app/shared/modules/tables/tables.module';

@NgModule({
  declarations: [CurrenciesComponent],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlModule,
    TablesModule,
  ],
})
export class CurrenciesModule {}
