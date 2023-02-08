import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-stroked-button',
  templateUrl: './stroked-button.component.html',
  styleUrls: ['./stroked-button.component.scss']
})
export class StrokedButtonComponent {

  @Input() color: ThemePalette = 'primary';
  @Input() type = 'button';
  @Input() isDisabled = false;
  @Input() label: string;
  @Output() onBtnClick = new EventEmitter<Event>();

  onClick(event: Event) {
    this.onBtnClick.emit(event);
  }
}
