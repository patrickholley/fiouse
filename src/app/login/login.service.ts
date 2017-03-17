import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class LoginService {

  constructor(private http: Http) { }

  login(login: any) {
    const body = JSON.stringify({username: login.username, password: login.password})
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put('http://localhost:3000/login', body, {
      headers: headers
    }).map((data: Response) =>  data.json())
      .catch((this.handleError))
  }

  reset(command: string) {
    const body = JSON.stringify({command})
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put('http://localhost:3000/reset', body, {
      headers: headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe(() => alert("All SQL data is reset to default."))
  }

  private handleError (error: any) {
    alert(`ERROR: ${error._body}`)
    console.log(error)
    return Observable.throw(error)
  }
}