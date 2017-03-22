import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable, Subject } from 'rxjs/Rx'

@Injectable()
export class ManagementService {
  static BASE_URL: string = 'http://localhost:3000'
  headers: Headers

  constructor(private http: Http) {
    this.headers = new Headers()
    this.headers.append('Content-Type', 'application/json')
  }

  addUser(user: any) {
    const body = JSON.stringify({username: user.username,
                                  first_name: user.first_name,
                                  last_name: user.last_name,
                                  email: user.email,
                                  role: user.role,
                                  password: user.password
                                })
    return this.http.post(`${ManagementService.BASE_URL}/employee`, body, {
      headers: this.headers
    })
  }
}

/*login(login: any) {
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
  }*/