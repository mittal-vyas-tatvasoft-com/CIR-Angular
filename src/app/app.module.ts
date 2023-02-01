import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthTokenInterceptor } from './core/interceptors/auth/auth-token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainHeaderComponent } from './core/components/main-header/main-header.component';
import { SideNavComponent } from './core/components/side-nav/side-nav.component';
import { SharedMaterialModule } from './shared/material/shared-material.module';
import { FormControlModule } from './shared/modules/form-control/form-control.module';


@NgModule({
  declarations: [AppComponent, MainHeaderComponent, SideNavComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, SharedMaterialModule, FormControlModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
