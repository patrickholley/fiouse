import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loggedIn = this.loginService.getLoggedIn()
  isLoggingIn = false
  submitError = false
  submitErrorMessage = ''

  constructor(private loginService: LoginService, private router: Router) {
    if (this.loggedIn) this.router.navigate(['home'])
  }

  login = {
    username: '',
    password: ''
  }

  onSubmit() {
    this.isLoggingIn = true
    this.loginService.login(this.login)
    this.login.username = ''
    this.login.password = ''
    setTimeout(() => this.isLoggingIn = false, 1000)
  }

  onContact() {
    this.loginService.contact()
  }

  onReset() {
    this.loginService.reset(prompt('WARNING: This will reset ALL SQL data within the entire databse. Please type "RESET" to continue the operation:'))
  }
}
