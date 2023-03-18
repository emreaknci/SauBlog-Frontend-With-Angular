import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthService, private toastrService: ToastrService) { }
  currentDate: any = new Date();
  decodedToken;
  ngOnInit() {

  }
  
  logOut() {
    this.toastrService.success('Çıkış Başarılı')
    this.authService.isLoggedIn=false;
    this.authService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  get currentUserEmail(): string {
    return this.authService.currentUserEmail;
  }
}
