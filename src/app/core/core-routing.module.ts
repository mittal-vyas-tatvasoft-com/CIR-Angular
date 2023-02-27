import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Navigation } from '../shared/common/enum';
import { CoreComponent } from './core.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CoreComponent,
    canActivate: [AuthGuard],
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
            '../modules/global-configuration/global-configuration-routing.module'
          ).then((m) => m.GlobalConfigurationRoutingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
