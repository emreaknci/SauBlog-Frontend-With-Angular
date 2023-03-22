import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommentForPaginationRequest } from 'src/app/models/commentForPaginationRequest';
import { CommentForListDto } from 'src/app/models/dtos/commentForListDto';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.scss']
})
export class MyCommentsComponent {
  displayedColumns: string[] = ['id', 'writerNickName','blogTitle','content', 'createdDate', 'updatedDate', 'status', 'options'];
  dataSource: MatTableDataSource<CommentForListDto>;
  filterValue: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  comments: CommentForListDto[];
  constructor(private commentService: CommentService) {
    this.dataSource = new MatTableDataSource(this.comments);

  }
  ngOnInit(): void {
    this.getWithPagination(this.params);
  }
  params: CommentForPaginationRequest={
    index: 0,
    size: 5,
    searchValueField:"content",
    searchValue:this.filterValue
  };

  getWithPagination(params: CommentForPaginationRequest) {
    this.commentService.getWithPagination(params).subscribe((response) => {
      this.comments = response.items;
      this.dataSource = new MatTableDataSource<CommentForListDto>(response.items);
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
    this.getWithPagination(this.params);
  }
  applyFilter(event: Event) {
    setTimeout(() => {
      this.setParams();
      this.getWithPagination(this.params);

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
