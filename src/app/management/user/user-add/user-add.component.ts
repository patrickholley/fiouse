import { FormsModule, NgForm } from '@angular/forms';
import { ManagementService } from './../../management.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  profile = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    password: '',
    cpassword: '',
    opassword: ''
  }
  isLoading = false

  constructor(private manageServ: ManagementService) {}

  onSubmit() {
  }
}