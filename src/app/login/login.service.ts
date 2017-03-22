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
  private isValidating = false

  constructor(private http: Http, private router: Router) {
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json')
    if (localStorage.getItem('session_id')) {
      this.logger.next(this.getLoggedIn())
    }
  }

  getLoggedIn() {
    if (localStorage.getItem('session_id') && !this.isValidating && this.router.url != 'login') {
      this.isValidating = true
      this.validateSession(localStorage.getItem('session_id')).subscribe()
    }
    if (!localStorage.getItem('session_id')) return false
    else return true
  }

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable()
  }

  createSession(id: number) {
    const body = JSON.stringify({id, fetcher: Math.floor(Math.random() * 1000000)})
    return this.http.post(`${LoginService.BASE_URL}/session`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe((session_id) => {
        localStorage.setItem('session_id', session_id)
        console.log(localStorage.getItem('session_id'))
        this.logger.next(this.getLoggedIn())
        this.router.navigate(['home'])
        this.isValidating = true
      })
  }

  validateSession(session_id: string) {
    return this.http.get(`${LoginService.BASE_URL}/session/${session_id}`, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((error) => {
        localStorage.removeItem('session_id')
        alert('Your session is expired or corrupted. Please login again.')
        this.router.navigate(['login'])
        console.log(error)
        return Observable.throw(error)
      })
  }

  login(login: any) {
    const body = JSON.stringify({username: login.username, password: login.password})
    return this.http.put(`${LoginService.BASE_URL}/login`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  logout() {
    const body = JSON.stringify({session_id: localStorage.getItem('session_id')})
    localStorage.removeItem('session_id')
    return this.http.delete(`${LoginService.BASE_URL}/logout`, {
      headers: this.headers,
      body
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe((data) => {
        alert(data)
        this.router.navigate(['login'])
      })
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
    alert(`ERROR: ${error._body}`)
    console.log(error)
    return Observable.throw(error)
  }
}