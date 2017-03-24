import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable, Subject } from 'rxjs/Rx'

@Injectable()
export class ManagementService {
  static BASE_URL: string = 'http://localhost:3000'
  headers: Headers
  user: any

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
                                  password: user.password,
                                  team_id: user.team_id,
                                  reports_to_id: user.reports_to_id,
                                  session_id: localStorage.getItem('session_id'),
                                  session_password: user.opassword
                                })
    return this.http.post(`${ManagementService.BASE_URL}/employee`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  getEditTeamList() {
    return this.http.get(`${ManagementService.BASE_URL}/edit-team/${localStorage.getItem('session_id')}`, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  getEditUserList() {
    return this.http.get(`${ManagementService.BASE_URL}/edit-employee/${localStorage.getItem('session_id')}`, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  getTeam() {
    return this.http.get(`${ManagementService.BASE_URL}/team/${localStorage.getItem('session_id')}`, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
      .subscribe(((data) => alert(data)))
  }

  updateUser(user: any) {
    const body = JSON.stringify({username: user.username,
                                  first_name: user.first_name,
                                  last_name: user.last_name,
                                  email: user.email,
                                  role: user.role,
                                  password: user.password,
                                  team_id: user.team_id,
                                  session_id: localStorage.getItem('session_id'),
                                  session_password: user.opassword
                                })
    return this.http.put(`${ManagementService.BASE_URL}/employee`, body, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  private handleError (error: any) {
    alert(error._body)
    console.log(error)
    return Observable.throw(error)
  }
}