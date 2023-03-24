import { Component, Inject, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogForPaginationRequest } from 'src/app/models/blogForPaginationRequest';
import { BlogForListDto } from 'src/app/models/dtos/blogForListDto';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    @Inject("baseUrl") private baseUrl: string,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService) { }

  imagePath: string = this.baseUrl + "Images/"
  blogForList: BlogForListDto[] = [];
  filterValue: string = '';
  id: number;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (v) => {
        this.setParams();
        this.id = v["id"];
        let route = this.activatedRoute.snapshot.routeConfig;
        if (route.path.includes("blogs/category"))
          this.params.categoryIds.push(this.id);
        if (route.path.includes("blogs/writer"))
          this.params.writerIds.push(this.id);
        this.getWithPagination(this.params)
      }
    })
  }

  getWithPagination(params: BlogForPaginationRequest) {
    this.blogService.getWithPagination(params).subscribe((response) => {
      this.length = response.count;
      this.blogForList = response.items;
      if (this.length == 0 && this.id) {
        this.toastrService.info(`Bu kategoriye ait bir blog bulunamadı. <br> <a href="/u/blog/add">İlk blogu sen yaz!</a>`, null, { timeOut: 5000 })
        this.router.navigate(["/"])
      }
    })
  }
  length;
  params: BlogForPaginationRequest = {
    index: 0,
    size: 4,
    searchValue: this.filterValue,
    searchValueField: "title",
    orderType: "desc",
    orderByField: "id",
  };


  pageEvent: PageEvent;
  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.params.index = e.pageIndex;
    this.params.size = e.pageSize;
    console.log(this.params)
    this.getWithPagination(this.params);
  }

  applyFilter(event: Event) {
    setTimeout(() => {
      console.log(this.params)

      this.getWithPagination(this.params);
      this.filterValue = (event.target as HTMLInputElement).value;
      this.params.searchValue = this.filterValue;
      console.log(this.params)

    }, 1000);

  }
  setParams() {
    this.params.categoryIds = []
    this.params.writerIds = []
    this.params.index = 0;
    this.params.size = 4;
    this.params.searchValue = this.filterValue;
    this.params.searchValueField = "title";
  }
}
