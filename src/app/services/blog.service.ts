import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import PaginationResult from '../models/baseModels/paginationResult';
import { Blog } from '../models/blog';
import { BlogForPaginationRequest } from '../models/blogForPaginationRequest';
import { BlogForCreateDto } from '../models/dtos/blogForCreateDto';
import { BlogForListDto } from '../models/dtos/blogForListDto';
import { LastBlogDto } from '../models/dtos/lastBlogDto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  getWithPagination(req: BlogForPaginationRequest) {

    let newPath = this.baseUrl + `api/blogs/GetWithPagination`
    return this.httpClient.get<PaginationResult<BlogForListDto>>(newPath,{params:this.setPaginationParams(req)});
  }
  getCurrentWriterBlogs(req: BlogForPaginationRequest) 
  {
    let newPath = this.baseUrl + `api/blogs/getCurrentWriterBlogs`
    return this.httpClient.get<PaginationResult<BlogForListDto>>(newPath,{params:this.setPaginationParams(req)});
  }
  async add(dto: BlogForCreateDto) {
    let newPath = this.baseUrl + `api/blogs/add`
    return this.httpClient.post<DataResult<Blog>>(newPath, dto);
  }
  addBlogImage(formData: FormData) {
    let newPath = this.baseUrl + `api/blogs/addBlogImage`
    return this.httpClient.post<DataResult<string>>(newPath, formData);
  }
  getLastBlogs(count: number) {
    let newPath = this.baseUrl + `api/blogs/getLastBlogs?count=${count}`
    return this.httpClient.get<DataResult<LastBlogDto>>(newPath);
  }
  getByIdWithDetails(id: number) {
    let newPath = this.baseUrl + `api/blogs/getByIdWithDetails?id=${id}`
    return this.httpClient.get<DataResult<Blog>>(newPath);
  }
  
  private setPaginationParams(req: BlogForPaginationRequest) {
    console.log("params=>", req)
    let params = new HttpParams()
      .append("Index", req.index)
      .append("Size", req.size)
      .append("OrderByField", req.orderByField)
      .append("OrderType", req.orderType)
      .append("SearchValue", req.searchValue)
      .append("searchValueField", req.searchValueField)

      req.categoryIds?.forEach(id => {
        params = params.append("categoryIds", id);
      });
      
      req.writerIds?.forEach(id => {
        params = params.append("writerIds", id);
      });
  

    return params;

  }
}

