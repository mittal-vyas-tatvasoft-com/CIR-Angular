import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { SnackbarService } from './snackbar/snackbar.service';
import { TreeViewComponent } from './modules/form-control/components/tree-view/tree-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoDataFoundComponent } from './modules/form-control/components/no-data-found/no-data-found/no-data-found.component';
import { FormControlModule } from './modules/form-control/form-control.module';

@NgModule({
  declarations: [TreeViewComponent, NoDataFoundComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    SharedMaterialModule,
    TreeViewComponent,
    ReactiveFormsModule,
    FormsModule,
    NoDataFoundComponent,
  ],
  providers: [SnackbarService],
})
export class SharedModule {}
