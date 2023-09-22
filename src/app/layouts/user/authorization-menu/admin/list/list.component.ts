import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/baseModels/user';
import { Role } from 'src/app/models/role';
import { Roles, RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  constructor(private roleService: RoleService) { }


  ngOnInit(): void {
    this.getAdmins();
  }


  admins: User[];
  role: Role;
  getAdmins() {
    this.roleService.getWithUsersById(1).subscribe({
      next: (v) => {
        this.role = v.data;
        this.admins = this.role.users;
      }
    })
  }
}
