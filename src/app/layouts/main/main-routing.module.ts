import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { BlogComponent } from './blog/blog.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = 
[
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: '', component: MainComponent,
    children: [
      { path: '', component: HomeComponent ,children:[
        { path: '', component: BlogComponent },
        { path: 'blogs', component: BlogComponent },
        { path: 'blog-detail/:title', component: BlogDetailComponent},
      ]},
     
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
