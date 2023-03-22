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
  private setPaginationParams(req: BlogForPaginationRequest) {
    let params = new HttpParams()
      .set("Index", req.index)
      .set("Size", req.size)
      .set("OrderByField", req.orderByField)
      .set("OrderType", req.orderType)
      .set("SearchValue", req.searchValue)
      .set("searchValueField", req.searchValueField)
    req.categoryIds?.forEach(id => params.set("categoryIds", id));
    req.writerIds?.forEach(id => params.set("writerIds", id));
    return params;

  }
}

