import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Writer } from 'src/app/models/writer';
import { AuthService } from 'src/app/services/auth.service';
import { WriterService } from 'src/app/services/writer.service';

@Component({
  selector: 'app-writer-detail',
  templateUrl: './writer-detail.component.html',
  styleUrls: ['./writer-detail.component.scss']
})
export class WriterDetailComponent  implements OnInit {
  constructor(
    private authService: AuthService,
    private writerService: WriterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService  
    ) { }
  ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.isLoggedIn = this.authService.isAuthenticated();
    if (this.isLoggedIn)
      this.isAdmin = this.authService.isCurrentUserAnAdmin();
    this.getByIdWithAllInfo(this.id);
  }

  isAdmin: boolean;
  isLoggedIn: boolean;
  writer:Writer;
  id:number;
  getByIdWithAllInfo(id:number){
    this.writerService.getByIdWithAllInfo(id).subscribe({
      next:(v)=>this.writer=v.data
    })
  }
}
