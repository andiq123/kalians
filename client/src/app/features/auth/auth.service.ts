import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseModel } from './modles/response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<ResponseModel> {
    return this.http
      .post<ResponseModel>(this.baseUrl + 'login', {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        })
      );
  }

  register(username: string, password: string): Observable<ResponseModel> {
    return this.http
      .post<ResponseModel>(this.baseUrl + 'register', {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          localStorage.setItem('token', res.token);
        })
      );
  }
}
