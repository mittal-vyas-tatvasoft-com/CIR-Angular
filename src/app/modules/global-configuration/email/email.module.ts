import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailListComponent } from './components/email-list/email-list.component';
import { EmailComponent } from './components/email/email.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormControlModule } from 'src/app/shared/modules/form-control/form-control.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EmailListComponent, EmailComponent],
  imports: [
    CommonModule,
    EmailRoutingModule,
    SharedModule,
    FormControlModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class EmailModule {}
