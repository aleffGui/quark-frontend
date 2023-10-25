import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient) { }

  findAllPaginated(filter = '', pageNumber = 0) : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/paginated?page=${pageNumber}&${filter}`);
  }

  findAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  findById(idUser:any) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idUser}`);
  }

  update(idUser:any, newUser: User) : Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${idUser}`, newUser);
  }

  insert(newUser:any) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, newUser);
  }

  delete(idUser:any) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idUser}`);
  }
}
