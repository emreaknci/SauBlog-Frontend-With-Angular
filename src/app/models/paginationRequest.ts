
export class PaginationRequest {
    searchValue?:string=null;
    searchValueField?:string=null;
    orderByField?:string="Id";
    orderType?:string="desc"; //asc-desc
    size?:number=5; 
    index?:number=0; 
}