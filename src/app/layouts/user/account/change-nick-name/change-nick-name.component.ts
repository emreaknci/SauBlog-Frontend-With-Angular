import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ChangeNickNameDto } from 'src/app/models/changeNickName';
import { Writer } from 'src/app/models/writer';
import { AuthService } from 'src/app/services/auth.service';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-change-nick-name',
  templateUrl: './change-nick-name.component.html',
  styleUrls: ['./change-nick-name.component.scss']
})
export class ChangeNickNameComponent implements OnInit {
  constructor(
    private writerService: WriterService,
    private authService: AuthService,
    private toastrService: ToastrService
  ) { }
  ngOnInit(): void {
    this.getWriter();
  };
  newNickName: string;
  currentNickName: string;
  writer: Writer;
  onSubmit() {
    if (this.newNickName == this.currentNickName) {
      this.toastrService.warning("Değiştirmek istediğiniz Nick mevcut Nick'iniz ile aynı olamaz")
      return;
    }
    let dto: ChangeNickNameDto = {
      userId: this.authService.getCurrentUserId(),
      newNickName: this.newNickName
    };
    this.changeNickName(dto);
  }
  getWriter() {
    this.writerService.getByUserId(this.authService.getCurrentUserId()).subscribe({
      next: (v) => {
        this.writer = v.data
        this.newNickName = this.writer.nickName;
        this.currentNickName = this.writer.nickName;
      }
    })
  }
  changeNickName(dto: ChangeNickNameDto) {
    this.writerService.changeNickName(dto).subscribe({
      next: (v) => {
        this.newNickName = this.currentNickName;
        this.toastrService.success(v.message)
      },
      error: (e) => console.log(e)
    })
  }
}
