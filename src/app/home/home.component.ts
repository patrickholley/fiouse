import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  isLoading = true

  onLogout() {
    this.loginService.logout()
  }

  ngOnInit() {
    this.loginService.validateSession(localStorage.getItem('session_id')).subscribe((data) => {
      this.isLoading = false
    })
  }
}