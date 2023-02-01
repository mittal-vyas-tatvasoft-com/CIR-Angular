import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppControlsRoutingModule } from './app-controls-routing.module';
import { SharedMaterialModule } from '../shared/material/shared-material.module';
import { FormControlModule } from '../shared/modules/form-control/form-control.module';
import { AppControlsComponent } from './component/app-controls.component';
import { AppModule } from "../app.module";

@NgModule({
    declarations: [AppControlsComponent],
    imports: [
        CommonModule,
        AppControlsRoutingModule,
        SharedMaterialModule,
        FormControlModule,
        AppModule
    ]
})
export class AppControlsModule {}
