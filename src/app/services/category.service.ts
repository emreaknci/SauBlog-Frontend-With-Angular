import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResult } from '../models/baseModels/dataResult';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { CategoryForListDto } from '../models/dtos/categoryForListDto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  getAll():Observable<DataResult<Category[]>>{
    return this.httpClient.get<DataResult<Category[]>>(this.baseUrl+"api/categories/getAll");
  }
  getAllWithBlogs(){
    return this.httpClient.get<DataResult<CategoryForListDto[]>>(this.baseUrl+"api/categories/getListWithBlogCount");

  }
}
