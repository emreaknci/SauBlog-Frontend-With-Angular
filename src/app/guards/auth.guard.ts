import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService

  ) { }
  returnUrl = this.router.routerState.snapshot.root.queryParams['returnUrl'];

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const currentUserRoles = this.authService.getCurrentUserRoles();
    const allowedRoles = childRoute.data['allowedRoles'] as string[];

    if (allowedRoles && !allowedRoles.some(role => currentUserRoles.includes(role))) {
      this.router.navigate(['/u']);
      this.toastrService.info("Bu işlemi yapmak için gerekli yetkiye sahip değilsiniz!");
      return false;
    }
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.toastrService.info("İşleme devam edebilmek için giriş yapmalısınız!");
      return false;
    }
    return true;
  }

}
export enum Roles {
  Admin = "Admin",
  Writer = "Writer",
  User = "User"
}