import { Inject, Injectable } from '@angular/core';
import { TokenModel } from '../models/tokenModel';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject("JWT_STORAGE_KEY") private JWT_STORAGE_KEY: string) { }
  setJwt(jwt: TokenModel) {
    localStorage.setItem(this.JWT_STORAGE_KEY, JSON.stringify(jwt));
  }
  getJwt(): TokenModel | null {
    const jwtData = localStorage.getItem(this.JWT_STORAGE_KEY);
    return jwtData ? JSON.parse(jwtData) : null;
  }

  removeJwt() {
    localStorage.removeItem(this.JWT_STORAGE_KEY);
  }
}
