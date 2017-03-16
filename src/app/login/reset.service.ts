import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx'
import { Observable } from 'rxjs/Rx'

@Injectable()
export class ResetService {

  constructor(private http: Http) { }

  reset(command: string) {
    const body = JSON.stringify({command})
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put('http://localhost:3000/reset', body, {
      headers: headers
    }).map((data: Response) => {
      data.json()
    })
      .catch((this.handleError))
      .subscribe(() => alert("All SQL data is reset to default"))
  }

  private handleError (error: any) {
    alert("ERROR: Reset failed")
    console.log(error)
    return Observable.throw(error)
  }
}
