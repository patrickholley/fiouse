import { LoginService } from './../../login/login.service';
import { Component } from '@angular/core';
import { ManagementService } from "../management.service";

@Component({
  selector: 'fio-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  userList = []
  isLoading = true

  constructor(private manageServ: ManagementService) {
    this.manageServ.getEditUserList().subscribe((users) => {
      this.userList = users.sort((a, b) => {
        if (a.last_name < b.last_name) return -1
        else if (b.last_name < a.last_name) return 1
        else if (a.first_name < b.first_name) return -1
        else return 1
      })
      this.isLoading = false
    })
  }

  editUser(user) {

  }
}