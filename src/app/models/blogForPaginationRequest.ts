import { PaginationRequest } from "./paginationRequest";

export class BlogForPaginationRequest extends PaginationRequest {
    categoryIds?:number[];
    writerIds?:number[];
}