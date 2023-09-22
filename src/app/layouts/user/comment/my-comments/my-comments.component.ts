import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CommentForPaginationRequest } from 'src/app/models/commentForPaginationRequest';
import { CommentForListDto } from 'src/app/models/dtos/commentForListDto';
import { Writer } from 'src/app/models/writer';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-my-comments',
  templateUrl: './my-comments.component.html',
  styleUrls: ['./my-comments.component.scss']
})
export class MyCommentsComponent {
  displayedColumns: string[] = ['id', 'writerNickName', 'blogTitle', 'content', 'createdDate', 'updatedDate', 'status', 'options'];
  dataSource: MatTableDataSource<CommentForListDto>;
  filterValue: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  comments: CommentForListDto[];
  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private writerService: WriterService) {
    this.dataSource = new MatTableDataSource(this.comments);

  }
  ngOnInit(): void {
    this.getCurrentUserComments(this.params);
  }
  params: CommentForPaginationRequest = {
    index: 0,
    size: 5,
    searchValueField: "content",
    searchValue: this.filterValue,
  };
  getCurrentUserComments(params: CommentForPaginationRequest) {
    this.commentService.getCurrentUserComments(params).subscribe((response) => {
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
    this.getCurrentUserComments(this.params);
    (this.params);
  }
  applyFilter(event: Event) {
    setTimeout(() => {
      this.setParams();
      this.getCurrentUserComments(this.params);
      (this.params);

      this.filterValue = (event.target as HTMLInputElement).value;

      this.dataSource.filter = this.filterValue.trim().toLowerCase();

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, 1000);

  }
  setParams() {
    this.params.index = this.paginator.pageIndex;
    this.params.size = this.paginator.pageSize;
    this.params.searchValue = this.filterValue;
  }
}
