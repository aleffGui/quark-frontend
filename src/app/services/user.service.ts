import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NewTaskDto } from '../models/dtos/new.task.dto';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.apiUrl + "/users";

  constructor(private http: HttpClient) { }

  findAll() : Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
}
