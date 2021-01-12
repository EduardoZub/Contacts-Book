import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserI } from '../../models/user';

export const AUTH_API = 'http://localhost:3000/';
export const TOCKEN = 'auth_token_edApp';

interface AuthI {
  username: string;
  password: string;
}

interface ServerResponseI {
  token: string;
  user: UserI;
}

const httpHeaders = {
  headers: new HttpHeaders({
    'Header-Name': 'Mocked Authorization',
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public errorMessage$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  public login(data: AuthI): void {
    this._http.post(`${AUTH_API}login`, { username: data.username, password: data.password }, httpHeaders)
      .subscribe((resp: ServerResponseI) => {
        localStorage.setItem(TOCKEN, JSON.stringify(resp));
        this._router.navigate(['admin']);
      }, error => {
        if (error.error) {  this.errorMessage$.next(error.error); }
      });
  }

  public logout(): void {
    localStorage.removeItem(TOCKEN);
    this._router.navigate(['login']);
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem(TOCKEN) !== null;
  }
}
