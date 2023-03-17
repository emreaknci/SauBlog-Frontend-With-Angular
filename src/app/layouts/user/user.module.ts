import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user/user.component';
import { AccountModule } from './account/account.module';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { BlogModule } from './blog/blog.module';

@NgModule({
  declarations: [
    UserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule, 
    AccountModule,
    CategoryModule,
    CommentModule,
    BlogModule
  ],
  exports:[]
})
export class UserModule { }
