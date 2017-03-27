import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ManagementService } from './../management.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  route = "Add"
  isLoading = true
  isFiouse = false
  teamList = []
  userList = []
  user = {
    company_id: null,
    team_id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    report_to_id: null,
    password: '',
    cpassword: '',
    opassword: ''
  }

  constructor(private manageServ: ManagementService, private router: Router) {
    this.manageServ.getEditTeamList(true).subscribe((teams) => {
      this.manageServ.getReportsToList().subscribe((users) => {
        this.teamList = teams.sort((a, b) => {
          if (a.company_id < b.company_id) return -1
          else if (b.company_id < a.company_id) return 1
          else if (a.name < b.name) return -1
          else return 1
        })
        this.userList = users.sort((a, b) => {
          if (a.company_id < b.company_id) return -1
          else if (b.company_id < a.company_id) return 1
          else if (a.last_name < b.last_name) return -1
          else if (b.last_name < a.last_name) return 1
          else if (a.first_name < b.first_name) return -1
          else return 1
        })
        this.isLoading = false
        for (let i = 0; i < this.teamList.length; i++) {
          if (this.teamList[i].id == 1) {
            this.isFiouse = true
            break
          }
        }
      })
    })
  }

  onSubmit() {
    if (this.user.password == this.user.cpassword) {
      this.manageServ.addUser(this.user).subscribe((data) => {
        alert(data)
        this.router.navigate(['management/user'])
      })
    }
    else alert('Passwords do not match. Please try again.')
  }

  onCancel() {
    this.router.navigate(['management/user'])
  }
}