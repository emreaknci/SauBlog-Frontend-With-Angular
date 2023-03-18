import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserForLoginDto } from 'src/app/models/dtos/userForLoginDto';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorageService: LocalStorageService,
    private router: Router) { }
  @Output() isLoggedInEvent = new EventEmitter<boolean>();
  @Output() currentUserEmail = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  submitted = false;
  returnUrl;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    })
    this.returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid)
      return;

    let dto: UserForLoginDto = Object.assign({}, this.form.value);

    this.authService.logIn(dto).subscribe((response) => {
      this.localStorageService.setJwt(response);
      this.authService.isLoggedIn = true;
      this.authService.currentUserEmail = this.authService.getCurrentUserEmail();
      this.isLoggedInEvent.emit(true);
      this.currentUserEmail.emit(this.authService.currentUserEmail);
      this.returnUrl ? this.router.navigate([this.returnUrl]) : this.router.navigate(['/']);

      this.toastrService.success('Giriş başarılı!');

    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
