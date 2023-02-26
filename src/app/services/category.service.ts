import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataResult } from '../models/baseModels/dataResult';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { CategoryForListDto } from '../models/dtos/categoryForListDto';
import PaginationResult from '../models/baseModels/paginationResult';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  getAll(): Observable<DataResult<Category[]>> {
    return this.httpClient.get<DataResult<Category[]>>(this.baseUrl + "api/categories/getAll");
  }
  getAllWithBlogs() {
    return this.httpClient.get<DataResult<CategoryForListDto[]>>(this.baseUrl + "api/categories/getListWithBlogCount");
  }
  getWithPagination(index: number, size: number,filter?:string) {
    let newPath = this.baseUrl + `api/categories/getWithPagination?index=${index}&size=${size}&filter=${filter}`
    return this.httpClient.get<PaginationResult<Category>>(newPath);
  }
}
