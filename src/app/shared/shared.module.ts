import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { EditorComponent } from './component/editor/editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { DeleteConfirmationDialogComponent } from './components/dialogs/delete-confirmation-dialog/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { NoDataFoundComponent } from './components/no-data-found/no-data-found/no-data-found.component';
import { SnackbarService } from './snackbar/snackbar.service';
@NgModule({
  declarations: [
    EditorComponent,
    DeleteConfirmationDialogComponent,
    NoDataFoundComponent,
  ],
  imports: [CommonModule, SharedMaterialModule, FormsModule, CKEditorModule],
  exports: [SharedMaterialModule, EditorComponent, NoDataFoundComponent],
  providers: [SnackbarService],
})
export class SharedModule {}
