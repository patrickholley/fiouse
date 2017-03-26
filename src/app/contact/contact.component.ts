import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'

import { ContactService } from './contact.service';

@Component({
  selector: 'fio-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  isEmailing = false

  constructor(private contactService: ContactService) { }
  contact = {
    company: '',
    name: '',
    phone: '',
    email: ''
  }

  onLogin() {
    this.contactService.backToLogin()
  }

  onSubmit(form: NgForm) {
    this.isEmailing = true
    this.contactService.submitForm(this.contact)
    this.contact.company = ''
    this.contact.name = ''
    this.contact.phone = ''
    this.contact.email = ''
    setTimeout(() => {
      this.isEmailing = false
    }, 1000)
  }
}