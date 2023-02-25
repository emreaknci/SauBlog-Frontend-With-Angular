import { Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import PaginationResult from 'src/app/models/baseModels/paginationResult';
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
  ngOnInit(): void {
    this.getWithPagination()
  }
  getWithPagination(index: number = 0, size: number = 4) {
    this.blogService.getWithPagination(index, size).subscribe((response) => {
      this.length = response.count;
      this.blogForList = response.items;
    })
  }
  length;
  pageSize = 6;
  pageIndex = 0;


  pageEvent: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getWithPagination(e.pageIndex, e.pageSize);
  }

}
