import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from '../shared/common/enum';
import { CoreComponent } from './core.component';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    // canActivate: [AuthGuardService],
    children: [
      {
        path: 'app-control',
        loadChildren: () =>
          import('../app-controls/app-controls.module').then(
            (m) => m.AppControlsModule,
          ),
      },
      {
        path: `${Navigation.Role}`,
        loadChildren: () =>
          import('../modules/users/roles/roles.module').then(
            (m) => m.RolesModule,
          ),
      },
      {
        path: `${Navigation.User}`,
        loadChildren: () =>
          import('../modules/users/users/users.module').then(
            (m) => m.UsersModule,
          ),
      },
      {
        path: `${Navigation.GlobalConfiguration}`,
        loadChildren: () =>
          import(
            '../modules/global-configuration/global-configuration.module'
          ).then((m) => m.GlobalConfigurationModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
