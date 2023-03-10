import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesListComponent } from './components/messages-list/messages-list.component';
import { SharedModule } from '../../../shared/shared.module';
import { FormControlModule } from '../../../shared/modules/form-control/form-control.module';

@NgModule({
  declarations: [MessagesListComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    SharedModule,
    FormControlModule,
  ],
})
export class MessagesModule {}
