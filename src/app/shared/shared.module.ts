import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { SnackbarService } from './snackbar/snackbar.service';
import { TreeViewComponent } from './modules/form-control/components/tree-view/tree-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoDataFoundComponent } from './modules/form-control/components/no-data-found/no-data-found/no-data-found.component';
import { EditorComponent } from './component/editor/editor.component';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  declarations: [EditorComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,

    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    EditorComponent,
  ],
})
export class SharedModule {}
