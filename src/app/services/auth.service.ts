import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/dtos/user.credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + "/auth";

  constructor(private http: HttpClient) { }


  login(credentials: UserCredentials) : Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/login`, credentials, {
      observe: 'response',
      responseType: 'json'
    });
  }
}
