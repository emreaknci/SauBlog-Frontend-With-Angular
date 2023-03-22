import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';
import PaginationResult from '../models/baseModels/paginationResult';
import { Comment } from '../models/comment';
import { CommentForPaginationRequest } from '../models/commentForPaginationRequest';
import { CommentForCreateDto } from '../models/dtos/commentForCreateDto';
import { CommentForListDto } from '../models/dtos/commentForListDto';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  getWithPagination(req:CommentForPaginationRequest) {
    let newPath = this.baseUrl + `api/comments/getWithPagination`
    return this.httpClient.get<PaginationResult<CommentForListDto>>(newPath,{params:this.setPaginationParams(req)});
  }
   add(dto: CommentForCreateDto) {
    let newPath = this.baseUrl + `api/comments/add`
    return this.httpClient.post<DataResult<Comment>>(newPath, dto);
  }
  private setPaginationParams(req: CommentForPaginationRequest) {
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
