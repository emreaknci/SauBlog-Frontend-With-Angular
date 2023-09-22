import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient,
    @Inject("baseUrl") private baseUrl: string
  ) { }

  getWithUsersById(id:number){
    let newPath = this.baseUrl + `api/roles/getWithUsersById?id=${id}`
    return this.httpClient.get<DataResult<Role>>(newPath);
  }
  getWithUsersByName(name:string){
    let newPath = this.baseUrl + `api/roles/getWithUsersByName?name=${name}`
    return this.httpClient.get<DataResult<Role>>(newPath);
  }
}
export enum Roles {
  Admin = "Admin",
  Writer = "Writer",
  User = "User"
}