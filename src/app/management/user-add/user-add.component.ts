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
  teamList = []
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

  constructor(private manageServ: ManagementService, private router: Router) {
    this.manageServ.getEditTeamList().subscribe((teams) => {
      this.teamList = teams.sort((a, b) => {
        if (a.name < b.name) return -1
        else if (b.name < a.name) return 1
        else return -1
      })
      this.isLoading = false
    })
  }

  onSubmit() {
    if (this.user.password == this.user.cpassword) {
      if (this.user.team_id != 0) {
        this.manageServ.addUser(this.user).subscribe((data) => {
          alert(data)
          this.router.navigate(['management/user'])
        })
      }
      else alert('Please choose a team.')
    }
    else alert('Passwords do not match. Please try again.')
  }
}