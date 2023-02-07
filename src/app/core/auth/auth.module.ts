import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { InnerpageComponent } from './components/innerpage/innerpage.component';
import { TablesModule } from 'src/app/shared/modules/tables/tables.module';

@NgModule({
  declarations: [LoginComponent, InnerpageComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule,TablesModule],
})
export class AuthModule {}
