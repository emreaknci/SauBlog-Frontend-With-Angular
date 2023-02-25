import { Component, OnInit } from '@angular/core';
import { CategoryForListDto } from 'src/app/models/dtos/categoryForListDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  categories: CategoryForListDto[] = [];
  constructor(private categoryService: CategoryService) {

  }
  ngOnInit(): void {
    this.getAllWithBlogs();
  }

  getAllWithBlogs() {
    this.categoryService.getAllWithBlogs().subscribe((response) => {
      this.categories = response.data;
    })
  }
}
