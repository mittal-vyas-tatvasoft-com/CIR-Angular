import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { SnackbarService } from './snackbar/snackbar.service';
import { TreeViewComponent } from './modules/form-control/components/tree-view/tree-view.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoDataFoundComponent } from './modules/form-control/components/no-data-found/no-data-found/no-data-found.component';
import { EditorComponent } from './component/editor/editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  declarations: [TreeViewComponent, NoDataFoundComponentEditorComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    CKEditorModule,
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
  providers: [SnackbarService, EditorComponent],
})
export class SharedModule {}
