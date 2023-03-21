import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  //templateUrl: './file-upload.component.html',
  template: `
  
  <div class="form-group inputDnD">
    <label class="sr-only" for="file-input">File Upload</label>
    <input [multiple]="options.multiple" type="file" class="form-control-file text-warning font-weight-bold" id="file-input"
      [accept]="options.allowsFileType" [attr.data-title]="options.explanation" (change)="onFileSelected($event)">
  </div>

  <br><br>

  <button *ngIf="selectedFiles.length==1" type="button" 
  class="btn btn-outline-warning text-warning btn-block w-100"
      (click)="onFileDeleted()">Dosyayı sil</button>

  <button *ngIf="selectedFiles.length>1" type="button" 
  class="btn btn-outline-warning text-warning btn-block w-100"
    (click)="onFileDeleted()">Dosyaları sil</button>
  `
  ,
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  constructor(private toastrService: ToastrService) { }

  @Input() options: Partial<FileUploadOptions> ;
  @Output() selectedFileUrlsEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() selectedFilesEvent: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() formDataEvent: EventEmitter<FormData> = new EventEmitter<FormData>();
  selectedFiles: File[] = [];
  selectedFileUrls: string[] = [];
  formData: FormData = new FormData();

  onFileSelected(event: any) {
    this.selectedFileUrls = [];
    this.selectedFiles = Array.from(event.target.files);

    if (this.selectedFiles.length > this.options.maxFiles) {
      this.toastrService.warning(`En fazla ${this.options.maxFiles} adet "${this.options.allowsFileType}" türünde dosya ekleyebilirsiniz!`)
      this.onFileDeleted()
      return;
    }
    for (let i = 0; i < this.selectedFiles.length; i++) {
      let file = this.selectedFiles[i];

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const url = reader.result as string;
        this.selectedFileUrls[i] = url;
        this.formData.append("file", file, file.name);
      };
    }
    this.selectedFileUrlsEvent.emit(this.selectedFileUrls)
    this.selectedFilesEvent.emit(this.selectedFiles);
    this.formDataEvent.emit(this.formData);

  }

  public onFileDeleted() {
    const count = this.selectedFiles.length;
    this.deleteFile();
    this.toastrService.success(`${count > 1 ? "Dosyalar" : "Dosya"} silindi`);

  }
  deleteFile() {
    this.selectedFileUrls = [];
    this.selectedFiles = [];

    let datas = this.formData.getAll("file");
    datas.forEach(_ => this.formData.delete("file"));

    this.selectedFileUrlsEvent.emit(this.selectedFileUrls)
    this.selectedFilesEvent.emit(this.selectedFiles);
    this.formDataEvent.emit(this.formData);
  }
}
export class FileUploadOptions {
  maxFiles: number;
  explanation: string;
  allowsFileType: string;
  multiple: boolean;
}