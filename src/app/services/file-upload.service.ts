import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DataResult } from '../models/baseModels/dataResult';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { }
  upload(formData: FormData) {
    let newPath = this.baseUrl + `api/FileUpload/upload`
    return this.httpClient.post<DataResult<string>>(newPath, formData);
  }
  uploadRange(formData: FormData) {
    let newPath = this.baseUrl + `api/FileUpload/uploadRange`
    return this.httpClient.post<DataResult<string[]>>(newPath, formData);
  }
}
