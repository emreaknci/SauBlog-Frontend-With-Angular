import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BlogForListDto } from 'src/app/models/dtos/blogForListDto';
import { BlogService } from 'src/app/services/blog.service';

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
    this.getWithPagination()
  }

  getWithPagination(index: number = 0, size: number = 5, filter: string = '') {
    this.blogService.getWithPagination(index, size, filter).subscribe((response) => {
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
    this.getWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.filterValue);
  }
  applyFilter(event: Event) {
    setTimeout(() => {
      this.getWithPagination(this.paginator.pageIndex, this.paginator.pageSize, this.filterValue);

      this.filterValue = (event.target as HTMLInputElement).value;

      this.dataSource.filter = this.filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, 1000);

  }
}