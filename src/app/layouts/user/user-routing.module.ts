import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeNickNameComponent } from './account/change-nick-name/change-nick-name.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { UserComponent } from './user/user.component';
import { AddComponent as CategoryAddComponent } from './category/add/add.component';
import { ListComponent as CategoryListComponent } from './category/list/list.component';
import { EditComponent as CategoryEditComponent } from './category/edit/edit.component';
import { ListComponent as CommentListComponent} from './comment/list/list.component';
import { MyCommentsComponent } from './comment/my-comments/my-comments.component';

const routes: Routes = [
  {//account
    path: 'u', component: UserComponent,
    children:
      [
        { path: '', component: EditProfileComponent },
        { path: 'edit-profile', component: EditProfileComponent },
        { path: 'change-password', component: ChangePasswordComponent },
        { path: 'change-nick-name', component: ChangeNickNameComponent },
      ]
  },
  {//category
    path: 'u', component: UserComponent,
    children:
      [
        { path: 'category', component: CategoryListComponent },
        { path: 'category/list', component: CategoryListComponent },
        { path: 'category/add', component: CategoryAddComponent },
        { path: 'category/edit/:id', component: CategoryEditComponent },
      ]
  },
  {//comment
    path: 'u', component: UserComponent,
    children:
      [
        { path: '', component: CommentListComponent },
        { path: 'comments', component: CommentListComponent },
        { path: 'my-comments', component: MyCommentsComponent },
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
