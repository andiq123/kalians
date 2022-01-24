import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const data = localStorage.getItem('token');

    if (isPlatformBrowser(this.platformId)) {
      const AuthRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + data),
      });
      return next.handle(AuthRequest);
    }
    return next.handle(request);
  }
}
