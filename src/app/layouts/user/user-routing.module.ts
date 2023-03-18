import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeNickNameComponent } from './account/change-nick-name/change-nick-name.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { EditProfileComponent } from './account/edit-profile/edit-profile.component';
import { UserComponent } from './user/user.component';

import { AddComponent as CategoryAddComponent } from './category/add/add.component';
import { ListComponent as CategoryListComponent } from './category/list/list.component';
import { EditComponent as CategoryEditComponent } from './category/edit/edit.component';

import { ListComponent as CommentListComponent } from './comment/list/list.component';
import { MyCommentsComponent } from './comment/my-comments/my-comments.component';

import { ListComponent as BlogListComponent } from './blog/list/list.component'
import { MyBlogsComponent } from './blog/my-blogs/my-blogs.component'
import { AddComponent as BlogAddComponent } from './blog/add/add.component'
import { AuthGuard } from 'src/app/guards/auth.guard';
const routes: Routes = [
  {//account
    path: 'u', component: UserComponent, canActivate: [AuthGuard],
    children:
      [
        { path: '', component: EditProfileComponent },
        { path: 'edit-profile', component: EditProfileComponent },
        { path: 'change-password', component: ChangePasswordComponent },
        { path: 'change-nick-name', component: ChangeNickNameComponent },
      ],

  },
  {//category
    path: 'u', component: UserComponent, canActivate: [AuthGuard],
    children:
      [
        { path: 'category', component: CategoryListComponent },
        { path: 'category/list', component: CategoryListComponent },
        { path: 'category/add', component: CategoryAddComponent },
        { path: 'category/edit/:id', component: CategoryEditComponent },
      ]
  },
  {//comment
    path: 'u', component: UserComponent, canActivate: [AuthGuard],
    children:
      [
        { path: 'comments', component: CommentListComponent },
        { path: 'comments/my-comments', component: MyCommentsComponent },
      ]
  },
  {//blog
    path: 'u', component: UserComponent, canActivate: [AuthGuard],
    children:
      [
        { path: 'blog', component: BlogListComponent },
        { path: 'blog/list', component: BlogListComponent },
        { path: 'blog/my-blogs', component: MyBlogsComponent },
        { path: 'blog/add', component: BlogAddComponent },
      ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
