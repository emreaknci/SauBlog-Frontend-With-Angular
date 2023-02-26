import { Component, OnInit } from '@angular/core';
import { LastBlogDto } from 'src/app/models/dtos/lastBlogDto';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-last-blogs',
  templateUrl: './last-blogs.component.html',
  styleUrls: ['./last-blogs.component.scss']
})
export class LastBlogsComponent implements OnInit {
  constructor(private blogService: BlogService) { }

  lastBlogs: LastBlogDto[] = [];

  ngOnInit(): void {
    this.getLastBlogs()
  }

  getLastBlogs(count: number = 3) {
    this.blogService.getLastBlogs(count).subscribe((response) => {
      this.lastBlogs = response.data;
    })
  }
}
