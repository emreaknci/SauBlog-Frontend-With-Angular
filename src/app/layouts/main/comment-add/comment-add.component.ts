import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Comment } from 'src/app/models/comment';
import { CommentForCreateDto } from 'src/app/models/dtos/commentForCreateDto';
import { Writer } from 'src/app/models/writer';
import { AuthService } from 'src/app/services/auth.service';
import { CommentService } from 'src/app/services/comment.service';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.scss']
})
export class CommentAddComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private writerService: WriterService,
    private commentService: CommentService,
    private toastrService:ToastrService
  ) { }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    if (this.isLoggedIn)
      this.isWriter = this.authService.isCurrentUserAWriter();
    if (this.isWriter)
      this.getCurrentWriter();

  }
  @Input() blogId: number;
  @Output() addedComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  isWriter: boolean;
  isLoggedIn: boolean;
  writer: Writer;
  content:string="";
  userImg = "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
  getCurrentWriter() {
    this.writerService.getByUserId(this.authService.getCurrentUserId()).subscribe({
      next: (v) => this.writer = v.data,
      error: (e) => console.log(e)
    })
  }
  async onSubmit() {
   let dto:CommentForCreateDto={
    blogId:this.blogId,
    content:this.content,
    writerId:this.writer.id
   }
   this.commentService.add(dto).subscribe({
    next:(v)=>{
      let comment:Comment={
        blogId: this.blogId,
        content: this.content,
        writer: this.writer,
        writerId: this.writer.id,
      };
      this.addedComment.emit(comment);
      this.toastrService.success(v.message);
    },
    error:(e)=>console.log(e)
   })
  }
}
