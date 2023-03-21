import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
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
}
