import { Router } from '@angular/router';
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
  isEditing = false
  isFiouse = false
  user: null

  constructor(private manageServ: ManagementService, private router: Router) {
    this.manageServ.getEditUserList().subscribe((users) => {
      this.userList = users.sort((a, b) => {
        if (a.last_name < b.last_name) return -1
        else if (b.last_name < a.last_name) return 1
        else if (a.first_name < b.first_name) return -1
        else return 1
      })
      for (let i = 0; i < this.userList.length; i++) {
        if (this.userList[i].id == 1) {
          this.isFiouse = true
          break
        }
      }
      this.isLoading = false
    })
  }

  editUser() {
    this.manageServ.user = this.user
    this.manageServ.user.password = ''
    this.isEditing = true
    this.router.navigate(['/management/edit-user'])
  }
}