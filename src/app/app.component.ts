import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SAU Blog';
  categories: Category[] = [];
  constructor(private cs: CategoryService, private toastr: ToastrService) {

  }
  ngOnInit(): void {
    this.getall();
  }
  getall() {
    this.cs.getAll().subscribe(
      (response) => {
        this.categories = response.data;
      });
  }
}
