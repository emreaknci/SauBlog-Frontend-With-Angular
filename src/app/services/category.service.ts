import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import DataReponseModel from '../models/dataResponseModel';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  getAll():Observable<DataReponseModel<Category[]>>{
    return this.httpClient.get<DataReponseModel<Category[]>>(this.baseUrl+"/categories/getAll");
  }
}
