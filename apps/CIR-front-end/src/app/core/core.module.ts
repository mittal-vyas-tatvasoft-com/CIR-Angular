import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreComponent } from './core.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SideBarNavigationComponent } from './components/side-bar-navigation/side-bar-navigation.component';
import { RouterModule } from '@angular/router';
import { CoreRoutingModule } from './core-routing.module';
import { SharedMaterialModule } from '../shared/material/shared-material.module';
import { BreadCrumbComponent } from './components/bread-crumb/bread-crumb.component';

@NgModule({
  declarations: [
    CoreComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    SideBarNavigationComponent,
    BreadCrumbComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreRoutingModule,
    SharedMaterialModule,
  ],
})
export class CoreModule {}
