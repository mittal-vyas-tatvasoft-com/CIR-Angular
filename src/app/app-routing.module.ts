import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { Navigation } from './shared/common/enum';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: `${Navigation.Admin}`,
    //component: SideNavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: `${Navigation.Role}`,
        loadChildren: () =>
          import('./modules/users/roles/roles.module').then(
            (m) => m.RolesModule,
          ),
      },
      {
        path: `${Navigation.User}`,
        loadChildren: () =>
          import('./modules/users/users/users.module').then(
            (m) => m.UsersModule,
          ),
      },
      {
        path: `${Navigation.GlobalConfiguration}`,
        loadChildren: () =>
          import(
            './modules/global-configuration/global-configuration.module'
          ).then((m) => m.GlobalConfigurationModule),
      },
      {
        path: `${Navigation.Fields}`,
        loadChildren: () =>
          import('./modules/global-configuration/Fields/fields.module').then(
            (m) => m.FieldsModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
