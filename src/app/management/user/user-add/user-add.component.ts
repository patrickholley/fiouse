import { FormsModule, NgForm } from '@angular/forms';
import { ManagementService } from './../../management.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  isLoading = true
  teamList = []
  user = {
    team_id: null,
    username: 'testerino',
    first_name: 'Tyler',
    last_name: 'Esterino',
    email: 'testerino@test.com',
    role: 'Tester',
    password: 'testerino',
    cpassword: 'testerino',
    opassword: 'oacolenheim'
  }

  constructor(private manageServ: ManagementService) {
    this.manageServ.getEditTeamList().subscribe((teams) => {
      this.teamList = teams
      this.isLoading = false
    })
  }

  onSubmit() {
    if (this.user.password == this.user.cpassword) {
      if (this.user.team_id != 0) {
        this.manageServ.addUser(this.user)
      }
      else alert('Please choose a team.')
    }
    else alert('Passwords do not match. Please try again.')
  }
}