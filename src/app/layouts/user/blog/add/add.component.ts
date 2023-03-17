import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryForListDto } from 'src/app/models/dtos/categoryForListDto';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(private categoryService: CategoryService) { };
  categories = new FormControl('');
  categoryList: Category[] ;
  ngOnInit() {
    this.getAllCategory();
  }
  getAllCategory() {
    this.categoryService.getAll().subscribe((response) => {
      this.categoryList = response.data;
    })
  }
}
