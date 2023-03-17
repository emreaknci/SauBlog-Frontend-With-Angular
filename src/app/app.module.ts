import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerInterceptor } from './interceptors/spinner-interceptor.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { MainModule } from './layouts/main/main.module';
import { UserModule } from './layouts/user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'timer' }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      progressBar: true,
      timeOut: 3000,
      progressAnimation: 'decreasing',
      enableHtml: true,
      disableTimeOut: 'extendedTimeOut'

    }),
    MainModule,
    UserModule,
  ],
  providers: [
    { provide: 'baseUrl', useValue: 'https://localhost:7126/', multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
