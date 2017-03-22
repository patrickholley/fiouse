import { LoginService } from './../login/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profile: any

  constructor(private loginService: LoginService) {
    this.loginService.getProfile(localStorage.getItem('session_id'))
      .subscribe((profile) => {
        this.profile = profile
        console.log(this.profile)
      })
  }
}
