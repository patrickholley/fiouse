import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loggedIn: boolean = this.loginService.getLoggedIn()

  constructor(private loginService: LoginService, private router: Router) {
    if (this.loggedIn) this.router.navigate(['home'])
  }

  login = {
    username: 'cwjsolo',
    password: 'cwjsolo'
  }

  onSubmit() {
    this.loginService.login(this.login).subscribe((data) => {
      this.loginService.createSession(data.id)
      alert(`Welcome, ${data.first_name}.`)
    })
  }

  onReset() {
    this.loginService.reset(prompt('WARNING: This will reset ALL SQL data within the entire databse. Please type "RESET" to continue the operation:'))
  }
}
