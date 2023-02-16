import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailListComponent } from './components/email-list/email-list.component';


@NgModule({
  declarations: [
    EmailListComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule
  ]
})
export class EmailModule { }
