import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import PaginationResult from '../models/baseModels/paginationResult';
import { CommentForListDto } from '../models/dtos/commentForListDto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  getWithPagination(index: number, size: number,filter:string='') {
    let newPath = this.baseUrl + `api/comments/getWithPagination?index=${index}&size=${size}&filter=${filter}`
    return this.httpClient.get<PaginationResult<CommentForListDto>>(newPath);
  }
}
