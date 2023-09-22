import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogComponent, DialogData } from 'src/app/components/dialog/dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    public dialog: MatDialog) { }
  currentDate: any = new Date();
  decodedToken;
  ngOnInit() {

  }
  opt: DialogData = {
    content: "Silmek",
    title: "emin misin",
  };
  logOut() {
    this.toastrService.success('Çıkış Başarılı')
    this.authService.isLoggedIn = false;
    this.authService.logOut();
  }

  openDialog() {
    const dialogRef = this.dialog.open<DialogComponent, DialogData>(DialogComponent, {
      enterAnimationDuration:'300ms',
      exitAnimationDuration:'300ms',
      width:'111rem',
      data: {
        title: "this.opt.title",
        content: "this.opt.content",
        callback: (result) => {
          if (result) {
            console.log('Yes clicked');
          } else {
            console.log('No clicked');
          }
        }
      }
    });
  }
  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn;
  }
  get currentUserEmail(): string {
    return this.authService.currentUserEmail;
  }
}
