import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isHandset: boolean | null;
  @Output() onMenuIconClick = new EventEmitter();

  onClick() {
    this.onMenuIconClick.emit();
  }
}
