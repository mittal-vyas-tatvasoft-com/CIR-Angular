import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    //canActivate: [AuthGuard],
    children: [
      {
        path: `${Navigation.Role}`,
        loadChildren: () =>
          import('./modules/users/roles/roles.module').then(
            (m) => m.RolesModule,
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
