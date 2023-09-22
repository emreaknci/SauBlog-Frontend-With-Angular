import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ListComponent,
    AssignRoleComponent
  ],
  imports: [
    CommonModule,
    RouterModule, 
    BrowserModule
   ]
})
export class AdminModule { }
