import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isHandset: boolean | null;
  @Output() onMenuIconClick = new EventEmitter();

  constructor(private loginService: LoginService) {}

  onClick() {
    this.onMenuIconClick.emit();
  }
  logout() {
    this.loginService.logout();
  }
}
