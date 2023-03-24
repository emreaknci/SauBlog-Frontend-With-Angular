import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import { Result } from '../models/baseModels/result';
import { ChangeNickNameDto } from '../models/changeNickName';
import { Writer } from '../models/writer';

@Injectable({
  providedIn: 'root'
})
export class WriterService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string,
  ) { }
  getByUserId(userId: number) {
    let newPath = this.baseUrl + `api/Writers/GetByUserId?id=${userId}`;
    return this.httpClient.get<DataResult<Writer>>(newPath);
  }
  getByIdWithAllInfo(id: number) {
    let newPath = this.baseUrl + `api/Writers/getByIdWithAllInfo?id=${id}`;
    return this.httpClient.get<DataResult<Writer>>(newPath);
  }
  changeNickName(dto:ChangeNickNameDto ) {
    let newPath = this.baseUrl + `api/writers/changeNickName`
    return this.httpClient.post<Result>(newPath, dto);
  }
}
