import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeNickNameComponent } from './account/change-nick-name/change-nick-name.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'u', component: UserComponent, 
    children: [
      { path: '', component: EditProfileComponent },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'change-nick-name', component:ChangeNickNameComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
