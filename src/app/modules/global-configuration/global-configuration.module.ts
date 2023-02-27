import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlobalConfigurationRoutingModule } from './global-configuration-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, GlobalConfigurationRoutingModule, SharedModule],
})
export class GlobalConfigurationModule {}
