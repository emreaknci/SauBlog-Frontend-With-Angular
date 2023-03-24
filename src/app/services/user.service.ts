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
  delete(userId: number) {
    let newPath = this.baseUrl + `api/users/delete?userId=${userId}`
    return this.httpClient.delete<Result>(newPath);
  }

}
