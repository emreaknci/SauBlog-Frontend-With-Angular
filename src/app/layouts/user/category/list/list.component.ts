import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category';
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
  categories: Category[];
  ngOnInit(): void {
    this.getWithPagination()
  }

  getWithPagination(index: number = 0, size: number = 5, filter: string = '') {
    this.categoryService.getWithPagination(index, size, filter).subscribe((response) => {
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


