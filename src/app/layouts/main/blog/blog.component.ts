import { Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    this.getWithPagination()
  }
  getWithPagination(index: number = this.pageIndex, size: number = this.pageSize, filter: string = '') {
    this.blogService.getWithPagination(index, size, filter).subscribe((response) => {
      this.length = response.count;
      this.blogForList = response.items;
    })
  }
  length;
  pageSize = 4;
  pageIndex = 0;


  pageEvent: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.getWithPagination(e.pageIndex, e.pageSize);
  }

  applyFilter(event: Event) {
    setTimeout(() => {
      this.getWithPagination(this.pageIndex, this.pageSize, this.filterValue);

      this.filterValue = (event.target as HTMLInputElement).value;


    }, 1000);

  }

}
