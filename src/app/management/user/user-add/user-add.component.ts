import { FormsModule, NgForm } from '@angular/forms';
import { ManagementService } from './../../management.service';
import { Component } from '@angular/core';

@Component({
  selector: 'fio-user',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent {
  user = {
    team_id: 'Choose a team. . . .',
    username: 'testerino',
    first_name: 'Tyler',
    last_name: 'Esterino',
    email: 'testerino@test.com',
    role: 'Tester',
    password: 'testerino',
    cpassword: 'testerino',
    opassword: 'oacolenheim'
  }
  isLoading = false
  teamList = []

  constructor(private manageServ: ManagementService) {
    this.manageServ.getEditTeamList().subscribe((teams) => this.teamList = teams)
  }

  onSubmit() {
    if (this.user.password == this.user.cpassword) {
      this.manageServ.addUser(this.user)
    }
  }
}