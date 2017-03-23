import { Router } from '@angular/router';
import { ManagementService } from './../management.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'fio-user-edit',
  templateUrl: '../user-add/user-add.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {
  route = "Edit"
  user = {
    team_id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    password: '',
    cpassword: '',
    opassword: ''
  }
  teamList
  isLoading = true
  isEdit = true
  
  constructor(private manageServ: ManagementService, router: Router) {
    if (manageServ.user) {
      this.user = manageServ.user
      manageServ.getEditTeamList().subscribe((teams) => {
        this.teamList = teams.sort((a, b) => {
          if (a.name < b.name) return -1
          else if (b.name < a.name) return 1
          else return -1
        })
        this.isLoading = false
      })
    }
    else router.navigate(['management/user'])
  }
}