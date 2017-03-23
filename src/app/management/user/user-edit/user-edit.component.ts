import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fio-user-edit',
  templateUrl: '../user-add/user-add.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Input() user:any
  constructor() { }

  ngOnInit() {
  }

}
