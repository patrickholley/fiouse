import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fio-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent {
  constructor(private loginService: LoginService) { }

  isLoggingOut = false

  onLogout() {
    this.loginService.logout()
  }
}
