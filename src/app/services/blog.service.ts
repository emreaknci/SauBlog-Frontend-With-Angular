import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import PaginationResult from '../models/baseModels/paginationResult';
import { Blog } from '../models/blog';
import { BlogForCreateDto } from '../models/dtos/blogForCreateDto';
import { BlogForListDto } from '../models/dtos/blogForListDto';
import { LastBlogDto } from '../models/dtos/lastBlogDto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  getWithPagination(index: number, size: number, filter?: string) {
    let newPath = this.baseUrl + `api/blogs/GetWithPagination?index=${index}&size=${size}&filter=${filter}`
    return this.httpClient.get<PaginationResult<BlogForListDto>>(newPath);
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
}

