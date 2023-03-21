import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FileUploadOptions } from 'src/app/components/file-upload/file-upload.component';
import { Category } from 'src/app/models/category';
import { BlogForCreateDto } from 'src/app/models/dtos/blogForCreateDto';
import { Writer } from 'src/app/models/writer';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { CategoryService } from 'src/app/services/category.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private writerService: WriterService,
    private blogService: BlogService,
    private toastrService: ToastrService,
    private fileUploadService: FileUploadService
  ) { };
  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    explanation: "Resimleri sürükleyin veya seçin",
    allowsFileType: ".png,.jpg,.jpeg",
    maxFiles: 1,
    multiple: false
  };
  form: FormGroup = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
    categoryIds: new FormControl(''),
  })
  submitted = false;
  categoryList: Category[];
  writer: Writer;
  selectedFiles: File[];
  selectedFileUrls: string[];
  formData: FormData;
  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      content: ['', [Validators.required, Validators.minLength(2)]],
      categoryIds: [[], [Validators.required]],
    })
    this.getAllCategory();
    this.getWriter();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((response) => {
      this.categoryList = response.data;
    })
  }

  async onSubmit() {
    this.submitted = true;
    // if (this.form.invalid)
    //   return;

    let dto: BlogForCreateDto = Object.assign({}, this.form.value);
    dto.writerId = this.writer.id;
    this.addBlogImage(this.formData).subscribe({
      next: (v) => {
        this.toastrService.success(v.message);
        dto.imagePath = v.data;
        this.addBlog(dto);
      },
      error: (err) => console.log(err)
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getWriter() {
    const userId = this.authService.getCurrentUserId();
    this.writerService.getByUserId(userId).subscribe({
      next: (v) => this.writer = v.data,
      error: (e) => { console.log(e) },
      complete: () => { }
    })
  }
  getFileUrls(urls: string[]) {
    this.selectedFileUrls = urls;
  }

  getSelectedFiles(files: File[]) {
    this.selectedFiles = files;
  }
  getFormData(formData: FormData) {
    this.formData = formData;
  }

  addBlogImage(formData: FormData) {
    return this.selectedFiles.length > 1
      ? this.fileUploadService.uploadRange(formData)
      : this.fileUploadService.upload(formData);
  }

  async addBlog(dto: BlogForCreateDto) {
    (await this.blogService.add(dto)).subscribe({
      next: (v) => this.toastrService.success(v.message),
      error: (err) => console.log(err)
    })
  }
}