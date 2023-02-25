import { Component, OnInit } from '@angular/core';
import { LastBlogDto } from 'src/app/models/dtos/lastBlogDto';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
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
