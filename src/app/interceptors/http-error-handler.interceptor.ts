import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.warning('Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz.', 'Yetkisiz İşlem!');
            this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.warning('Sunucu Hatası!');
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.warning("Hata");
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.warning('Sayfa bulunamadı.');
            break;
          default:
            this.toastrService.warning('Beklenmeyen bir hata ile karşılaşıldı.', 'Hata!');
            break;
        }
        return of(error);
      })
    );
  }
}
