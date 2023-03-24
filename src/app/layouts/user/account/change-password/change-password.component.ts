import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForChangePasswordDto } from 'src/app/models/userForChangePasswordDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { passwordValidator } from 'src/app/utils/customValidators/passwordValidator';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validator: passwordMatchValidator })

  }
  hideOldPassword: boolean = true;
  hideNewPassword: boolean = true;
  hideConfirmNewPassword: boolean = true;

  form: FormGroup = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;
  onSubmit() {
    if (this.form.invalid)
      return;

    let dto: UserForChangePasswordDto = {
      newPassword: this.form.get("newPassword").value,
      oldPassword: this.form.get("oldPassword").value,
      userId: this.authService.getCurrentUserId(),
    };
    console.log(dto)
    this.changePassword(dto);
  }
  changePassword(dto: UserForChangePasswordDto) {
    this.userService.changePassword(dto).subscribe({
      next: (v) => {
        this.toastrService.success(v.message);
        this.authService.logOut();
        this.router.navigate(["/login"])
      }
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