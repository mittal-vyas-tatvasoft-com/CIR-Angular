import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerpageComponent } from './core/auth/components/innerpage/innerpage.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'inner-page',
    component:InnerpageComponent
  },
  {
    path: 'app-control',
    loadChildren: () =>
      import('./app-controls/app-controls.module').then(
        (m) => m.AppControlsModule,
      ),
  },
  {
    path: 'table',
    loadChildren: () =>
      import('./tables/table-demo.module').then(
        (m) => m.TableDemoModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
