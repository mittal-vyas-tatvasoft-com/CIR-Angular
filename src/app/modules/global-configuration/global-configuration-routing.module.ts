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
  {
    path: `${Navigation.CutOffTimes}`,
    loadChildren: () =>
      import('./cut-off-times/cut-off-times.module').then(
        (m) => m.CutOffTimesModule,
      ),
  },
  {
    path: `${Navigation.Email}`,
    loadChildren: () =>
      import('./email/email.module').then((m) => m.EmailModule),
  },
  {
    path: `${Navigation.Messages}`,
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalConfigurationRoutingModule { }
