import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor.module';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() data = 'Hello world!<br> This is the testing text.';
  @Output() change = new EventEmitter();
  @Input() type: number;
  @Input() id: number;

  onChange(event: any, type: number, messageId: number) {
    const data = event.editor.getData();
    this.change.emit({
      data: data,
      type: type,
      messageId: messageId,
    });
  }
}
