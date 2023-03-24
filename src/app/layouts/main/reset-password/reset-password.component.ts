import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordDto } from 'src/app/models/dtos/resetPasswordDto';
import { ResetPasswordToken } from 'src/app/models/resetPasswordToken';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from 'src/app/utils/customValidators/passwordValidator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {

  }

  form: FormGroup = new FormGroup({
    userId: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  resetToken: string;
  decodedToken: ResetPasswordToken = null;

  newPassword = this.f['newPassword'].value;
  confirmPassword = this.f['confirmPassword'].value;
  isInvalid:boolean=false;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      newPassword: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: passwordMatchValidator })
    this.resetToken = this.activatedRoute.snapshot.paramMap.get('reset-password-token');
    this.verifyResetToken();
  }

  verifyResetToken() {
    this.authService.verifyResetToken(this.resetToken).subscribe({
      next: (value) => {
        this.decodedToken = value.data
      },
      error: (err) => {
        this.router.navigate(["/"])
      }
    })

  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid)
      return;

    let dto: ResetPasswordDto = {
      newPassword: this.form.get("newPassword").value,
      userId: this.decodedToken.userId
    };
    this.authService.resetPassword(dto).subscribe({
      next: (v) => {
        this.toastrService.success(v.message)
        this.router.navigate(["/"])
      },
      error: (e) => { }
    })
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
//hatalı 
function passwordMatchValidator(formGroup: FormGroup) {
  const newPassword = formGroup.get('newPassword').value;
  const confirmPassword = formGroup.get('confirmPassword').value;

  return newPassword === confirmPassword ? null : { passwordsNotMatched: true };
}