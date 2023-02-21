import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { EditorComponent } from './component/editor/editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
@NgModule({
  declarations: [EditorComponent],
  imports: [CommonModule, SharedMaterialModule, FormsModule, CKEditorModule],
  exports: [SharedMaterialModule, EditorComponent],
})
export class SharedModule {}
