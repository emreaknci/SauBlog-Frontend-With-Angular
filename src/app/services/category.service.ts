import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataResult } from '../models/baseModels/dataResult';
import { Category } from '../models/category';
import { filter, Observable } from 'rxjs';
import { CategoryForListDto } from '../models/dtos/categoryForListDto';
import PaginationResult from '../models/baseModels/paginationResult';
import { CategoryForPaginationRequest } from '../models/categoryForPaginationRequest';

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
  getWithPagination(req: CategoryForPaginationRequest) {
    let newPath = this.baseUrl + `api/categories/getWithPagination`
    return this.httpClient.get<PaginationResult<Category>>(newPath,{params:this.setPaginationParams(req)});
  }
  
  private setPaginationParams(req: CategoryForPaginationRequest) {
    let params = new HttpParams()
      .set("Index", req.index)
      .set("Size", req.size)
      .set("OrderByField", req.orderByField)
      .set("OrderType", req.orderType)
      .set("SearchValue", req.searchValue)
      .set("searchValueField", req.searchValueField)
   
    return params;

  }
}
