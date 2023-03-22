import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { MainModule } from './layouts/main/main.module';
import { UserModule } from './layouts/user/user.module';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { RouterModule } from '@angular/router';
import { HttpErrorHandlerInterceptor } from './interceptors/http-error-handler.interceptor';
import { ErrorNotFoundComponent } from './components/error-not-found/error-not-found.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorForbiddenComponent } from './components/error-forbidden/error-forbidden.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ErrorNotFoundComponent,
    ErrorForbiddenComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'timer' }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
      progressAnimation: 'decreasing',
      enableHtml: true,
      disableTimeOut: 'extendedTimeOut'
    }),
    MainModule,
    UserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt'),
        allowedDomains: ['localhost:7213'],
      },
    }),

  ],
  providers: [
    { provide: 'baseUrl', useValue: 'https://localhost:7126/', multi: true },
    { provide: 'JWT_STORAGE_KEY', useValue: 'jwt', multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorHandlerInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
