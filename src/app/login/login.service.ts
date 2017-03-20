import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class LoginService {
  static BASE_URL: string = 'http://localhost:3000'
  headers: Headers

  constructor(private http: Http) {
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json')
  }

  createSession(id: number) {
    const body = JSON.stringify({id})
    return this.http.put(`${LoginService.BASE_URL}/session`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  login(login: any) {
    const body = JSON.stringify({username: login.username, password: login.password})
    return this.http.put(`${LoginService.BASE_URL}/login`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  reset(command: string) {
    const body = JSON.stringify({command})
    return this.http.put(`${LoginService.BASE_URL}/reset`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe((data) => alert(`${data}`))
  }

  private handleError (error: any) {
    alert(`ERROR: ${error._body}`)
    console.log(error)
    return Observable.throw(error)
  }
}