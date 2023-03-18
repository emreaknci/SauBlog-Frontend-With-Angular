import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
  ) { }
  ngOnInit(): void {
  }


  email: string = "";
  sendResetPasswordEmail() {
    this.authService.sendResetPasswordEmail(this.email).subscribe({
      next: (v)=>this.toastrService.success(v.message),
      error: (e)=>this.toastrService.warning(e.message),
      complete: ()=>{}
    });
  }
}
