import { Router } from '@angular/router';
import { ManagementService } from './../management.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'fio-user-edit',
  templateUrl: '../user-add/user-add.component.html',
  styleUrls: ['../user-add/user-add.component.css']
})
export class UserEditComponent {
  route = "Edit"
  user = {
    id: null,
    team_id: null,
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    reports_to_id: null,
    password: '',
    cpassword: '',
    opassword: ''
  }
  baseUser
  teamList
  userList
  isLoading = true
  isEdit = true
  isFiouse = false
  isView = true
  editor = 'Edit'
  
  constructor(private manageServ: ManagementService, private router: Router) {
    if (manageServ.user) {
      this.manageServ.getReportsToList().subscribe((users) => {
        this.userList = users.sort((a, b) => {
          if (a.company_id < b.company_id) return -1
          else if (b.company_id < a.company_id) return 1
          else if (a.last_name < b.last_name) return -1
          else if (b.last_name < a.last_name) return 1
          else if (a.first_name < b.first_name) return -1
          else return 1
        })
        this.user = manageServ.user
        this.user.password = ''
        this.user.cpassword = ''
        this.baseUser = Object.assign({}, this.user)
        this.isLoading = false
      })
    }
    else router.navigate(['management/user'])
  }

  onEdit() {
    this.manageServ.getEditTeamList(false).subscribe((teams) => {
      this.teamList = teams.sort((a, b) => {
        if (a.company_id < b.company_id) return -1
        else if (b.company_id < a.company_id) return 1
        else if (a.name < b.name) return -1
        else return 1
      })
      for (let i = 0; i < this.teamList.length; i++) {
        if (this.teamList[i].id == 1) {
          this.isFiouse = true
          break
        }
      }
      if (this.editor == 'Cancel') this.editor = 'Edit'
      else this.editor = 'Cancel'
      this.isView = !this.isView
      this.user = Object.assign({}, this.baseUser)
    })
  }

  onSubmit() {
    if (this.user.password == this.user.cpassword) {
      this.manageServ.updateUser(this.user).subscribe((data) => {
        alert(data)
        this.router.navigate(['management/user'])
      })
    }
    else {
      console.log("UP: ", this.user.password, " CP: ", this.user.cpassword)
      alert('Passwords do not match. Please try again.')
    }
  }

  onCancel() {
    this.router.navigate(['management/user'])
  }

  onDelete() {
    if(confirm('Are you sure you wish to delete this user? You cannot revert this decision.')) {
      this.manageServ.deleteUser(this.user).subscribe((data) => {
        alert(data)
        this.router.navigate(['management/user'])      
      })
    }
    else alert('Delete aborted.')
  }
}