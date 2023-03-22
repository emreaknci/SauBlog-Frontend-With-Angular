import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService

  ) { }
  returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {

      //this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      this.toastrService.info("Bu işlemi yapmak için giriş yapmalısınız!");
    }
    return true;
  }

}
