import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private localStorageService: LocalStorageService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwt = this.localStorageService.getJwt();
    if (jwt != null) {
      let newRequest: HttpRequest<any>;
      newRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + jwt.token)
      })
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
