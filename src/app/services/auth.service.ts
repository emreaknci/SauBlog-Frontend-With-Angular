import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Result } from '../models/baseModels/result';
import { UserForLoginDto } from '../models/dtos/userForLoginDto';
import { UserForRegisterDto } from '../models/dtos/userForRegisterDto';
import { WriterForRegisterDto } from '../models/dtos/writerForRegisterDto';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string,
    private jwtHelper: JwtHelperService, private localStorageService: LocalStorageService) { }
    
  isLoggedIn = this.isAuthenticated();
  currentUserEmail = this.getCurrentUserEmail();

  logIn(dto: UserForLoginDto) {
    let newPath = this.baseUrl + `api/auth/Login`
    return this.httpClient.post<TokenModel>(newPath, dto);
  }
  registerForWriter(dto: WriterForRegisterDto) {
    let newPath = this.baseUrl + `api/auth/registerForWriter`
    return this.httpClient.post<Result>(newPath, dto);
  }

  registerForUser(dto: UserForRegisterDto) {
    let newPath = this.baseUrl + `api/auth/registerForUser`
    return this.httpClient.post<Result>(newPath, dto);
  }


  // independent of api

  logOut() {
    this.localStorageService.removeJwt();
  }
  decodeJwt() {
    const jwt = this.localStorageService.getJwt();
    const decoded = this.jwtHelper.decodeToken(jwt.token);
    return decoded;
  }
  isTokenExpired() {
    return this.jwtHelper.isTokenExpired(this.localStorageService.getJwt().token);
  }
  isAuthenticated() {
    if (this.localStorageService.getJwt() == null)
      return false;

    if (this.isTokenExpired()) {
      this.localStorageService.removeJwt();
      return false;
    }

    return true
  }
  getCurrentUserEmail() {
    return this.isAuthenticated()
      ? this.decodeJwt().email
      : null
  }
}
