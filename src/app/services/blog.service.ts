import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import PaginationResult from '../models/baseModels/paginationResult';
import { BlogForListDto } from '../models/dtos/blogForListDto';
import { LastBlogDto } from '../models/dtos/lastBlogDto';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  getWithPagination(index: number, size: number) {
    let newPath = this.baseUrl + `api/blogs/GetWithPagination?index=${index}&size=${size}`
    return this.httpClient.get<PaginationResult<BlogForListDto>>(newPath);
  }
  getLastBlogs(count: number) {
    let newPath = this.baseUrl + `api/blogs/getLastBlogs?count=${count}`
    return this.httpClient.get<DataResult<LastBlogDto>>(newPath);
  }
}
