import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/baseModels/user';
import { UserForUpdateDto } from 'src/app/models/userForUpdateDto';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
  ) { }
  ngOnInit(): void {
    this.getById();
  }
  user: User;
  firstName: string;
  lastName: string;
  onSubmit() {
    if (this.user.firstName == this.firstName && this.user.lastName == this.lastName) {
      this.toastrService.warning("Değişiklik yapmadınız.")
      return;
    }
    let dto: UserForUpdateDto = {
      id: this.authService.getCurrentUserId(),
      firstName: this.firstName,
      lastName: this.lastName
    }
    this.update(dto);
  }
  update(dto: UserForUpdateDto) {
    this.userService.update(dto).subscribe({
      next: (v) => {
        this.toastrService.success(v.message);
        this.user=v.data;
      }
    })
  }
  getById() {
    this.userService.getById(this.authService.getCurrentUserId()).subscribe({
      next: (v) => {
        this.user = v.data;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
      }
    })
  }
}
