import { ManagementService } from './../../management.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fio-user-edit',
  templateUrl: '../user-add/user-add.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  route = "Edit"
  user: any
  constructor(private manageServ: ManagementService) {
    this.user = manageServ.user
    console.log(this.user)
  }

  ngOnInit() {
  }

}