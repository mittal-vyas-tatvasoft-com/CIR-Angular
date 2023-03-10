import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent {
  @Input() data = 'Hello world!<br> This is the testing text.';
  @Output() change = new EventEmitter();
  @Input() id: number;
  @Input() type: number;

  onChange(event: any, type: number, messageId: number) {
    const data = event.editor.getData();
    this.change.emit({
      data: data,
      type: type,
      messageId: messageId,
    });
  }
}
