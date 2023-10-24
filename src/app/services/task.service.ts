import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task';
import { NewTaskDto } from '../models/dtos/new.task.dto';
import { environment } from '../config';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = environment.apiUrl + "/tasks";

  constructor(private http: HttpClient) { }


  findAll(filter = '', pageNumber = 0) : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?page=${pageNumber}&${filter}`);
  }
  
  findById(idTask:any) : Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${idTask}`);
  }

  update(idTask:any, newTask: Task) : Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${idTask}`, newTask);
  }

  insert(newTask: NewTaskDto) : Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, newTask);
  }

  delete(idTask:any) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/${idTask}`);
  }
  
  markTaskAsComplete(idTask:any) : Observable<any> {
    return this.http.patch(`${this.apiUrl}/${idTask}/complete`, idTask);
  }
}
