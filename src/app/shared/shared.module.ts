import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found.component';

@NgModule({
  declarations: [NoDataFoundComponent],
  imports: [CommonModule, SharedMaterialModule],
  exports: [SharedMaterialModule, NoDataFoundComponent],
})
export class SharedModule {}
