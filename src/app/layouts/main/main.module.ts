import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { LastBlogsComponent } from './last-blogs/last-blogs.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentAddComponent } from './comment-add/comment-add.component';


@NgModule({
  declarations: [
    HomeComponent,
    BlogComponent,
    CategoryListComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    MainComponent,
    BlogDetailComponent,
    LastBlogsComponent,
    ResetPasswordComponent,
    CommentListComponent,
    CommentAddComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule
  ]
})
export class MainModule { }
