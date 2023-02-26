import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  panelOpenState = false;

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


}
