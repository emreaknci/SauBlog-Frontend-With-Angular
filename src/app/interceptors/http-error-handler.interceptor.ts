import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private toastrService: ToastrService,
    private router: Router
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // return next.handle(request).pipe(
    //   catchError((httpErrorResponse) => {
    //     switch (httpErrorResponse.status) {
    //       case HttpStatusCode.Unauthorized:
    //         this.toastrService.warning('Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz.', 'Yetkisiz İşlem!');
    //         this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
    //         break;
    //       case HttpStatusCode.InternalServerError:
    //         this.toastrService.warning('Sunucu Hatası!');
    //         break;
    //       case HttpStatusCode.BadRequest:
    //         this.toastrService
    //           .warning
    //           (
    //             httpErrorResponse.error.message
    //               ? httpErrorResponse.error.message
    //               : "Hata"
    //           );
    //         break;
    //       case HttpStatusCode.NotFound:
    //         this.toastrService.warning('Sayfa bulunamadı.');
    //         break;
    //       default:
    //         this.toastrService.warning('Beklenmeyen bir hata ile karşılaşıldı.', 'Hata!');
    //         break;
    //     }
    //     return of(httpErrorResponse);
    //   })
    // );
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        if (httpErrorResponse.status === HttpStatusCode.Unauthorized) {
          this.toastrService.warning('Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz.', 'Yetkisiz İşlem!');
          this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.routerState.snapshot.url } });
        }
        if (httpErrorResponse.status === HttpStatusCode.InternalServerError) {
          this.toastrService.warning('Sunucu Hatası!');
        }
        if (httpErrorResponse.status === HttpStatusCode.NotFound) {
          this.toastrService.warning('Sayfa bulunamadı.');
        }
        if (httpErrorResponse.status === HttpStatusCode.BadRequest) {
          this.toastrService.warning(httpErrorResponse.error.message);
          return throwError(() => new Error(httpErrorResponse.error.message));
        }
        this.toastrService.warning('Beklenmeyen bir hata ile karşılaşıldı.', 'Hata!')
        return throwError(() => new Error());

      })
    );

  }
}
