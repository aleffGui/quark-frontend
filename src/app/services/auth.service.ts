import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/dtos/user.credentials';
import { TokenService } from './token.service';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient, private tokenService: TokenService) { }


  login(credentials: UserCredentials) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials, {
      observe: 'response',
      responseType: 'json'
    });
  }

  isAuthenticated() {
    return this.tokenService.getToken();
  }
}
