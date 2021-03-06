import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class ContactService {

  constructor(private http: Http, private router: Router) { }

  backToLogin() {
    this.router.navigate(['login'])
  }

  submitForm(contact: any) {
    const body = JSON.stringify(contact)
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('http://138.68.244.22/api/contact', body, {
      headers: headers
    }).map((data: Response) => data.json())
      .catch(this.handleError)
      .subscribe(() => alert("Thank you. One of our representatives will reach out to you within 24 hours"))
  }

  private handleError (error: any) {
    console.log(error)
    return Observable.throw(error)
  }
}