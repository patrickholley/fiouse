import { ResetService } from './reset.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fio-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private resetService: ResetService) { }

  ngOnInit() {
  }

  onReset() {
    this.resetService.reset(prompt('WARNING: This will reset ALL SQL data within the entire databse. Please type "RESET" to continue the operation:'))
  }

}
