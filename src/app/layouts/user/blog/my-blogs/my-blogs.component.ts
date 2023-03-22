import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlogForPaginationRequest } from 'src/app/models/blogForPaginationRequest';
import { BlogForListDto } from 'src/app/models/dtos/blogForListDto';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-my-blogs',
  templateUrl: './my-blogs.component.html',
  styleUrls: ['./my-blogs.component.scss']
})
export class MyBlogsComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'title','writerNickName','commentCount', 'createdDate', 'updatedDate', 'status', 'options'];
  dataSource: MatTableDataSource<BlogForListDto>;
  filterValue: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private blogService: BlogService) {
    this.dataSource = new MatTableDataSource(this.blogs);
  }
  blogs: BlogForListDto[];
  ngOnInit(): void {
    this.getCurrentWriterBlogs(this.params)
  }
  params: BlogForPaginationRequest={
    index: 0,
    size: 5,
    searchValueField:"title",
    searchValue:this.filterValue
  };

  getCurrentWriterBlogs(params: BlogForPaginationRequest) {
    this.blogService.getCurrentWriterBlogs(params).subscribe((response) => {
      this.blogs = response.items;
      this.dataSource = new MatTableDataSource<BlogForListDto>(response.items);
      this.paginator.pageSize = response.size;
      this.paginator.pageIndex = response.index;
      this.paginator.length = response.count;
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  pageChanged() {
    this.params.size = this.paginator.pageSize;
    this.params.index = this.paginator.pageIndex;
    this.params.searchValue = this.filterValue;
    this.getCurrentWriterBlogs(this.params);
  }
  applyFilter(event: Event) {
    setTimeout(() => {
      this.setParams();
      this.getCurrentWriterBlogs(this.params);

      this.filterValue = (event.target as HTMLInputElement).value;

      this.dataSource.filter = this.filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, 1000);

  }
  setParams(){
    this.params.index=this.paginator.pageIndex;
    this.params.size=this.paginator.pageSize;
    this.params.searchValue=this.filterValue;
  }
}