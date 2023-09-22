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
import { ListComponent as AdminListComponent } from './authorization-menu/admin/list/list.component';
import { AssignRoleComponent } from './authorization-menu/admin/assign-role/assign-role.component';

import { ListComponent as WriterListComponent } from './authorization-menu/writer/list/list.component';

import { AuthGuard } from 'src/app/guards/auth.guard';
import { Roles } from 'src/app/services/role.service';

const routes: Routes = [
  {
    path: 'u',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'edit-profile'
      },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'change-password', component: ChangePasswordComponent },
      { path: 'change-nick-name', component: ChangeNickNameComponent },
      {
        path: 'category', canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'list' },
          { path: 'list', component: CategoryListComponent, data: { allowedRoles: [Roles.Admin] } },
          { path: 'add', component: CategoryAddComponent, data: { allowedRoles: [Roles.Admin] } },
          { path: 'edit/:id', component: CategoryEditComponent, data: { allowedRoles: [Roles.Admin] } }
        ]
      },
      {
        path: 'comments', canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'my-comments' },
          { path: 'my-comments', component: MyCommentsComponent, data: { allowedRoles: [Roles.Writer] } },
          { path: 'list', component: CommentListComponent, data: { allowedRoles: [Roles.Admin] } }
        ]
      },
      {
        path: 'blog',
        canActivateChild: [AuthGuard],
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'my-blogs' },
          { path: 'my-blogs', component: MyBlogsComponent, data: { allowedRoles: [Roles.Writer] } },
          { path: 'list', component: BlogListComponent, data: { allowedRoles: [Roles.Admin] } },
          { path: 'add', component: BlogAddComponent, data: { allowedRoles: [Roles.Writer] } }
        ]
      },
      {
        path: 'auth',
        canActivateChild: [AuthGuard],
        data: { allowedRoles: [Roles.Admin] },
        children: [
          { path: 'admin', pathMatch: 'full', redirectTo: 'admin/list' },
          { path: 'admin/list', component: AdminListComponent },
          { path: 'admin/assign-role', component: AssignRoleComponent },
          { path: 'writer', pathMatch: 'full', redirectTo: 'writer/list' },
          { path: 'writer/list', component: WriterListComponent }
        ]
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
