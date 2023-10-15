import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { NewTaskDto } from '../models/dtos/new.task.dto';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl + "/tasks";

  constructor(private http: HttpClient) { }

  findAll() : Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }
  
  insert(newTask: NewTaskDto) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, newTask);
  }
}
