import { Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { BlogForPaginationRequest } from 'src/app/models/blogForPaginationRequest';
import { BlogForListDto } from 'src/app/models/dtos/blogForListDto';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  constructor(private blogService: BlogService, @Inject("baseUrl") private baseUrl: string) { }
  imagePath: string = this.baseUrl + "Images/"
  blogForList: BlogForListDto[] = [];
  filterValue: string = '';
  ngOnInit(): void {
    this.setParams();
    console.log(this.params)
    this.getWithPagination(this.params)
  }
  getWithPagination(params: BlogForPaginationRequest) {
    this.blogService.getWithPagination(params).subscribe((response) => {
      this.length = response.count;
      this.blogForList = response.items;
    })
  }
  length;
  params: BlogForPaginationRequest={
    index:0,
    size:4,
    searchValue:this.filterValue,
    searchValueField:"title",
    orderType:"desc",
    orderByField:"id",
  };


  pageEvent: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.params.index=e.pageIndex;
    this.params.size=e.pageSize;
    console.log(this.params)
    this.getWithPagination(this.params);
  }

  applyFilter(event: Event) {
    setTimeout(() => {
      console.log(this.params)

      this.getWithPagination(this.params);
      this.filterValue = (event.target as HTMLInputElement).value;
      this.params.searchValue=this.filterValue;
      console.log(this.params)

    }, 1000);

  }
  setParams() {
    this.params.index = 0;
    this.params.size = 4;
    this.params.searchValue = this.filterValue;
    this.params.searchValueField = "title";
  }
}
