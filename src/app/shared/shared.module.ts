import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedMaterialModule } from './material/shared-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './component/editor/editor.component';

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
