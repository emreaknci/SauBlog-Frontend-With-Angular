import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { MyBlogsComponent } from './my-blogs/my-blogs.component';
import { AddComponent } from './add/add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadModule } from "../../../components/file-upload/file-upload.module";
import { ImageSliderModule } from 'src/app/components/image-slider/image-slider.module';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [
        ListComponent,
        MyBlogsComponent,
        AddComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        FileUploadModule,
        ImageSliderModule
    ]
})
export class BlogModule { }
