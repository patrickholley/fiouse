import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loggedIn: boolean = this.loginService.getLoggedIn()

  constructor(private loginService: LoginService) { }

  login = {
    username: 'cwjsolo',
    password: 'cwjsolo'
  }

  ngOnInit() {
    this.loginService.isLoggedIn().subscribe((loggedIn) => this.loggedIn = loggedIn)
  }

  onSubmit() {
    this.loginService.login(this.login).subscribe((data) => {
      this.loginService.createSession(data.id)
      alert(`Welcome, ${data.first_name}.`)
    })
    this.login.username = ''
    this.login.password = ''
  }

  onReset() {
    this.loginService.reset(prompt('WARNING: This will reset ALL SQL data within the entire databse. Please type "RESET" to continue the operation:'))
  }
}
