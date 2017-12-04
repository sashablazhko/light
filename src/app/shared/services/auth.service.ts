import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  private authUrl: string = 'http://smktesting.herokuapp.com/api';
  private loggedIn: boolean = false;

  // observable source
  private authRegisterSource = new Subject<any>();

  // observable stream
  authRegister$ = this.authRegisterSource.asObservable();

  constructor(private http: Http) {
    // look at localStorage to check if the user is logged in
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  /**
   * Registration the user
   */
  register(username: string, password: string): Observable<any> {
    const data = JSON.stringify({
      username,
      password
    });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`${this.authUrl}/register/`, data, {headers: headers})
      .map(res => res.json())
      .do(res => {
        if (res.token) {
          localStorage.setItem('auth_token', res.token);
          this.loggedIn = true;
        }
      })
      .do(res => this.authRegister(res))
      .catch(this.handleError);
  }

  /**
   * Check if the user is logged in
   */
  isLoggedIn() {
    return this.loggedIn;
  }

  /**
   * Log the user
   */
  login(username: string, password: string): Observable<any> {
      const data = JSON.stringify({
        username,
        password
      });
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      return this.http.post(`${this.authUrl}/login/`, data, {headers: headers})
        .map(res => res.json())
        .do(res => {
          if (res.token) {
            localStorage.setItem('auth_token', res.token);
            this.loggedIn = true;
          }
        })
        .catch(this.handleError);
  }

  /**
   * Log the user out
   */
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  /**
   * The user was register. Add this info to our stream
   */
  private authRegister(data: any) {
    console.log('new user registration complete');
    this.authRegisterSource.next(data);
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err) {
    let errMessage: string;

    if (err instanceof Response) {
      const body   = err.json() || '';
      const error  = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }

    return Observable.throw(errMessage);
  }

}

