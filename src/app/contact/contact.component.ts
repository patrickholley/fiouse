import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'fio-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor() { }
  contact = {
    company: 'Acme Co.',
    name: 'Wile E. Coyote',
    phone: '017 009 1949',
    email: 'wecoyote@acme.com'
  }

  onSubmit(form: NgForm) {
    console.log(form.value)
  }
}
