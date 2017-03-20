import { LoginService } from './login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private loginService: LoginService) { }

  login = {
    username: 'cwjsolo',
    password: 'cwjsolo'
  }

  onSubmit() {
    this.loginService.login(this.login).subscribe((data) => {
      this.loginService.createSession(data.id).subscribe((subdata) => {
        alert(`Welcome, ${subdata.id}`)
      })
      alert(`Welcome, ${data.first_name}.`)
    })
    this.login.username = ''
    this.login.password = ''
  }

  onReset() {
    this.loginService.reset(prompt('WARNING: This will reset ALL SQL data within the entire databse. Please type "RESET" to continue the operation:'))
  }
}
