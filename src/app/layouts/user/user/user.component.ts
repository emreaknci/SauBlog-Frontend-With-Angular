import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  constructor(private authService: AuthService, private toastrService: ToastrService) { }
  panelOpenState = false;
  isAdmin: boolean = this.authService.isCurrentUserAnAdmin();
  isWriter: boolean = this.authService.isCurrentUserAWriter();
  userEmail:string = this.authService.getCurrentUserEmail();
  ngOnInit(): void {
    (function ($) {

      "use strict";

      var fullHeight = function () {

        $('.js-fullheight').css('height', $(window).height());
        $(window).resize(function () {
          $('.js-fullheight').css('height', $(window).height());
        });

      };
      fullHeight();

      $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
      });

    })($);
  }
  logOut() {
    this.toastrService.success('Çıkış Başarılı')
    this.authService.isLoggedIn = false;
    this.authService.logOut();
  }

}
