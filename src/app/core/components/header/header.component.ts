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

  constructor(public loginService: LoginService) {}
  onClick() {
    this.onMenuIconClick.emit();
  }

  //clear the token and logout the user
  logout() {
    this.loginService.logout();
  }
}
