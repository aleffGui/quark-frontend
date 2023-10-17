import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokenKey = 'auth_token';

  constructor() { }

  decodeToken(token: any): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  setToken(token: any): void {
    sessionStorage.setItem(this.tokenKey, token.token);
  }

  removeToken(): void {
    sessionStorage.removeItem(this.tokenKey);
  }
}
