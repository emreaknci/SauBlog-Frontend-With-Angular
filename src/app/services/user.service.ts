import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import { Result } from '../models/baseModels/result';
import { User } from '../models/baseModels/user';
import { UserForChangePasswordDto } from '../models/userForChangePasswordDto';
import { UserForUpdateDto } from '../models/userForUpdateDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient,
    @Inject("baseUrl") private baseUrl: string
  ) { }

  update(dto: UserForUpdateDto) {
    let newPath = this.baseUrl + `api/users/update`
    return this.httpClient.put<DataResult<User>>(newPath, dto);
  }
  getById(id: number) {
    let newPath = this.baseUrl + `api/users/getById?id=${id}`
    return this.httpClient.get<DataResult<User>>(newPath);
  }
  changePassword(dto: UserForChangePasswordDto) {
    let newPath = this.baseUrl + `api/users/changePassword`
    return this.httpClient.put<Result>(newPath, dto);
  }
  assignRole(id: number, roleName: string) {
    let newPath = this.baseUrl + `api/users/assignRole?id=${id}&roleName=${roleName}`
    return this.httpClient.get<Result>(newPath);
  }
  revokeRole(id: number, roleName: string) {
    let newPath = this.baseUrl + `api/users/revokeRole?id=${id}&roleName=${roleName}`
    return this.httpClient.get<Result>(newPath);
  }
  delete(id: number) {
    let newPath = this.baseUrl + `api/users/delete?userId=${id}`
    return this.httpClient.delete<Result>(newPath);
  }

}
