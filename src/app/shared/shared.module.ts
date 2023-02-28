import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { EditorComponent } from './components/editor/editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeleteConfirmationDialogComponent } from './dialogs/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [EditorComponent, DeleteConfirmationDialogComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
  ],
  exports: [
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    EditorComponent,
    DeleteConfirmationDialogComponent,
    CKEditorModule,
  ],
})
export class SharedModule {}
