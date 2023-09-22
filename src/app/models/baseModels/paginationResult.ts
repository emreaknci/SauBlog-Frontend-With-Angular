import { Result } from "./result";

export default interface PaginationResult<T> extends Result{
    items:T[];
    index:number;
    size:number;
    count:number;
    pages:number;
    hasPrevious:boolean;
    hasNext:boolean;
}