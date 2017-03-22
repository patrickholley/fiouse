import { LoginService } from './../login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    cpassword: '',
  }
  isLoading = true

  constructor(private loginService: LoginService) {
    this.loginService.getProfile(localStorage.getItem('session_id'))
      .subscribe((profile) => {
        this.profile = profile
        this.profile.password = ''
        this.profile.cpassword = ''
        console.log(this.profile)
        this.isLoading = false
      })
  }
}
