import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WriterForRegisterDto } from 'src/app/models/dtos/writerForRegisterDto';
import { AuthService } from 'src/app/services/auth.service';
import { passwordValidator } from 'src/app/utils/customValidators/passwordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder) { }
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    nickName: new FormControl(''),
  })
  submitted = false;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(2)]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, passwordValidator]],
      nickName: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid)
      return;

    let dto: WriterForRegisterDto = Object.assign({}, this.form.value);
    this.authService.registerForWriter(dto).subscribe({
      next:(v)=>{this.toastrService.success(v.message)},
      error:(e)=>{this.toastrService.warning(e.error.message)},
      complete:()=>{},
    })


  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

 

}
