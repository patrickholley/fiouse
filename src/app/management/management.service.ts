import { Router } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable, Subject } from 'rxjs/Rx'

@Injectable()
export class ManagementService {
  static BASE_URL: string = 'http://138.68.244.22/api'
  headers: Headers
  user: any

  constructor(private http: Http, private router: Router) {
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

  deleteUser(user: any) {
    const body = JSON.stringify({id: user.id,
                                session_id: localStorage.getItem('session_id'),
                                session_password: user.opassword})
    return this.http.delete(`${ManagementService.BASE_URL}/employee`, {
      headers: this.headers,
      body
    }).map((data: Response) => data.json())
      .catch((this.handleError))
  }

  getEditTeamList(navigate: boolean) {
    return this.http.get(`${ManagementService.BASE_URL}/edit-team/${localStorage.getItem('session_id')}`, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch(((error) => {
        alert(error._body)
        if (navigate) this.router.navigate(['/management/user'])
        console.log(error)
        return Observable.throw(error)
    }))
  }

  getViewUserList() {
    return this.http.get(`${ManagementService.BASE_URL}/view-employee/${localStorage.getItem('session_id')}`, {
      headers: this.headers
    }).map((data: Response) => data.json())
      .catch(((error) => {
        alert(error._body)
        this.router.navigate(['/'])
        console.log(error)
        return Observable.throw(error)
    }))
  }

  getReportsToList() {
    return this.http.get(`${ManagementService.BASE_URL}/employee/${localStorage.getItem('session_id')}`, {
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
    const body = JSON.stringify({id: user.id,
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