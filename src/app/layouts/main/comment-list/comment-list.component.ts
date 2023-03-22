import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from 'src/app/models/comment';
declare var $: any;

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

  @Input() comments?: Comment[];
  userImg = "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";


}
