import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailListComponent } from './components/email-list/email-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmailListComponent,
    data: { breadCrumb: 'Emails' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailRoutingModule {}
