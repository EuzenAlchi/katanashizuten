import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

import { DataLogin, Login } from '../interfaces/auth.interfaces';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _urlBase: string = environment.urlBase;

  constructor(private http: HttpClient) {}

  login(data: Login): Observable<DataLogin> {
    return this.http.post<DataLogin>(`${this._urlBase}/login`, data).pipe(
      tap(({ token }) => {
        localStorage.setItem('token', token);
      }),
      catchError((err) => throwError(() => err))
    );
  }
}
