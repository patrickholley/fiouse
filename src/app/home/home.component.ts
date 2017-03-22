import { LoginService } from './../login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private loginService: LoginService) { }

  isLoggingOut = false

  onLogout() {
    this.loginService.logout()
  }
}