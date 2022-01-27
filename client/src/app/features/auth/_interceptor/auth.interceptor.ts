import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const data = localStorage.getItem('token');
    if (!data) {
      return next.handle(request);
    }
    const AuthRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + data),
    });
    return next.handle(AuthRequest);
  }
}
