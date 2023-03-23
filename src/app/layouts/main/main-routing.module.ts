import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogComponent } from './blog/blog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WriterDetailComponent } from './writer-detail/writer-detail.component';

const routes: Routes = 
[
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: HomeComponent ,children:[
        { path: '', component: BlogComponent },
        { path: 'blogs', component: BlogComponent },
        { path: 'blogs/category/:id', component: BlogComponent },
        { path: 'blogs/writer/:id', component: BlogComponent },
        { path: 'blog-detail/:id', component: BlogDetailComponent},
      ]},
     
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'writer-detail/:id', component:WriterDetailComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },      
      { path: 'reset-password/:reset-password-token', component: ResetPasswordComponent},      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
