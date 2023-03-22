import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
import { CategoryForPaginationRequest } from 'src/app/models/categoryForPaginationRequest';
import { CategoryForListDto } from 'src/app/models/dtos/categoryForListDto';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-list',
  styleUrls: ['list.component.scss'],
  templateUrl: 'list.component.html',
})

export class ListComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['id', 'name', 'createdDate', 'updatedDate', 'status', 'options'];
  dataSource: MatTableDataSource<Category>;
  filterValue: string = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private categoryService: CategoryService) {

    this.dataSource = new MatTableDataSource(this.categories);
  }
  ngOnInit(): void {
    this.getWithPagination(this.params);
  }
  categories: Category[];
  params: CategoryForPaginationRequest={
    index: 0,
    size: 5,
    searchValueField:"content",
    searchValue:this.filterValue
  };

  getWithPagination(params: CategoryForPaginationRequest) {
    this.categoryService.getWithPagination(params).subscribe((response) => {
      this.categories = response.items;
      this.dataSource = new MatTableDataSource<Category>(response.items);
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


