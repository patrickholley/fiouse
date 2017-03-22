import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable, Subject } from 'rxjs/Rx'

@Injectable()
export class LoginService {
  static BASE_URL: string = 'http://localhost:3000'
  headers: Headers

  private logger = new Subject<boolean>()

  constructor(private http: Http, private router: Router) {
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json')
    if (localStorage.getItem('session_id')) {
      this.logger.next(this.getLoggedIn())
    }
  }

  getLoggedIn() {
    if (!localStorage.getItem('session_id')) return false
    else return true
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable()
  }

  login(login: any) {
    const body = JSON.stringify({username: login.username,
                                  password: login.password,
                                  fetcher: Math.floor(Math.random() * 1000000)})
    return this.http.post(`${LoginService.BASE_URL}/login`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe((session_id) => {
        this.router.navigate(['home'])
        localStorage.setItem('session_id', session_id)
        this.logger.next(this.getLoggedIn())
      })
  }

  logout() {
    const body = JSON.stringify({session_id: localStorage.getItem('session_id')})
    localStorage.removeItem('session_id')
    return this.http.delete(`${LoginService.BASE_URL}/logout`, {
      headers: this.headers,
      body
    }).map((data: Response) => data.json())
      .catch((error) => {
        this.router.navigate(['login'])
        console.log(error)
        return Observable.throw(error)
      })
      .subscribe(() => this.router.navigate(['login']))
  }

  reset(command: string) {
    const body = JSON.stringify({command})
    return this.http.put(`${LoginService.BASE_URL}/reset`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe((data) => {
        alert(data)
        localStorage.removeItem('session_id')
        this.logger.next(this.getLoggedIn())
      })
  }

  private handleError (error: any) {
    alert(error._body)
    console.log(error)
    return Observable.throw(error)
  }
}