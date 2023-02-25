import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [

    ChangePasswordComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
