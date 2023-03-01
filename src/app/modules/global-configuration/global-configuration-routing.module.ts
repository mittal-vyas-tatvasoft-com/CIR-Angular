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
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./currencies/currencies.module').then((m) => m.CurrenciesModule),
  },
  {
    path: `${Navigation.CutOffTimes}`,
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./cut-off-times/cut-off-times.module').then(
        (m) => m.CutOffTimesModule,
      ),
  },
  {
    path: `${Navigation.Email}`,
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./email/email.module').then((m) => m.EmailModule),
  },
  {
    path: `${Navigation.Fields}`,
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./Fields/fields.module').then((m) => m.FieldsModule),
  },
  {
    path: `${Navigation.Messages}`,
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./messages/messages.module').then((m) => m.MessagesModule),
  },
  {
    path: `${Navigation.Font}`,
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./fonts/fonts.module').then((m) => m.FontsModule),
  },
  {
    path: `${Navigation.DropdownOption}`,
    loadChildren: () =>
      import('./Reasons/reasons.module').then((m) => m.ReasonsModule),
  },
  {
    path: `${Navigation.Style}`,
    data: { breadCrumb: 'GlobalConfiguration' },
    loadChildren: () =>
      import('./styles/styles.module').then((m) => m.StylesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalConfigurationRoutingModule { }
