import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  constructor(
    private blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    @Inject("baseUrl") private baseUrl: string
  ) {}

  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getBlog();
  }
  imagePath: string = this.baseUrl + "Images/"

  blog: Blog;
  id: number;
  getBlog() {
    this.blogService.getByIdWithDetails(this.id).subscribe({
      next: (v) => this.blog = v.data,
      error: (err) => {
        this.toastrService.error(err.message);
        this.router.navigate([history.go(-1)])
      }
    })
  }
  onCommentAdded(comment: Comment) {
    this.blog.comments.push(comment);
  }
}
