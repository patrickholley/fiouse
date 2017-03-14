import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

import { ContactService } from './contact.service';

@Component({
  selector: 'fio-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  constructor(private contactService: ContactService) { }
  contact = {
    company: 'Acme Co.',
    name: 'Wile E. Coyote',
    phone: '017 009 1949',
    email: 'wecoyote@acme.com'
  }

  onSubmit(form: NgForm) {
    this.contactService.submitForm(this.contact)
    this.contact.company = ''
    this.contact.name = ''
    this.contact.phone = ''
    this.contact.email = ''
  }
}