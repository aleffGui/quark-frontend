import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-read-all',
  templateUrl: './task-read-all.component.html',
  styleUrls: ['./task-read-all.component.css']
})
export class TaskReadAllComponent implements OnInit {
  
  tasks: any = [];
  users: User[] = [];
  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.findAlTasks();
  }

  findAlTasks() {
    this.taskService.findAll().subscribe((response) => {
      this.tasks = response
    })
  }
}
