import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { Usuario } from '../models/usuario';
import { CommonService } from './common.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_API = `${this.commonService.apiURL}/auth`;

  constructor(private commonService: CommonService, private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // return this.http.post(
    //   this.AUTH_API + 'signin',
    //   {
    //     username,
    //     password,
    //   },
    //   this.commonService.httpOptions
    // );
    return this.http
      .get<Usuario>(`${this.AUTH_API}/${username}${password}`)
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  register(user: Usuario): Observable<any> {
    // return this.http.post(
    //   this.AUTH_API + 'signup',
    //   {
    //     username,
    //     email,
    //     password,
    //   },
    //   this.commonService.httpOptions
    // );
    const id = user.username.toString() + user.password.toString();
    user.id = id;

    return this.http
      .post<Usuario>(
        `${this.AUTH_API}`,
        JSON.stringify(user),
        this.commonService.httpOptions
      )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  logout(): Observable<any> {
    // #TODO: 
    return this.http.post(this.AUTH_API + 'signout', {}, this.commonService.httpOptions);
  }

}
