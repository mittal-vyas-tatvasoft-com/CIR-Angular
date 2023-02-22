import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        path: `role`,
        loadChildren: () =>
          import('../modules/users/roles/roles.module').then(
            (m) => m.RolesModule,
          ),
      },
      {
        path: `user`,
        loadChildren: () =>
          import('../modules/users/roles/roles.module').then(
            (m) => m.RolesModule,
          ),
      },
      {
        path: `GlobalConfiguration`,
        loadChildren: () =>
          import('../modules/users/roles/roles.module').then(
            (m) => m.RolesModule,
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
