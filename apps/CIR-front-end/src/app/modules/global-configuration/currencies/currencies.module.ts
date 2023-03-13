import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrenciesRoutingModule } from './currencies-routing.module';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';
import { TablesModule } from '../../../shared/modules/tables/tables.module';
import { AddCurrencyComponent } from './components/add-currency/add-currency.component';
import { SharedMaterialModule } from '../../../shared/material/shared-material.module';

@NgModule({
  declarations: [CurrenciesComponent, AddCurrencyComponent],
  imports: [
    CommonModule,
    CurrenciesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormControlModule,
    TablesModule,
    SharedMaterialModule,
  ],
})
export class CurrenciesModule {}
