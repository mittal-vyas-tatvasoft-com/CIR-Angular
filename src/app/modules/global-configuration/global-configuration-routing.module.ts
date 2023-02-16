import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from 'src/app/shared/common/enum';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'currencies',
    pathMatch: 'full',
  },
  {
    path: `${Navigation.Currencies}`,
    loadChildren: () =>
      import('./currencies/currencies.module').then((m) => m.CurrenciesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalConfigurationRoutingModule {}
