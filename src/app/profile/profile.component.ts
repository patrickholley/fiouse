import { LoginService } from './../login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private loginService: LoginService) { }

  isLoading = true

  onLogout() {
    this.loginService.logout()
  }

  ngOnInit() {
    this.loginService.validateSession(localStorage.getItem('session_id')).subscribe((data) => {
      console.log(data.employee_id)
      this.isLoading = false
    })
  }
}
