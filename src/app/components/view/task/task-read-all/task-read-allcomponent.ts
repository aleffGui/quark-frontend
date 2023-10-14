import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-read-all',
  templateUrl: './task-read-all.component.html',
  styleUrls: ['./task-read-all.component.css']
})
export class TaskReadAllComponent implements OnInit {
  
  tasks: any = [];

  constructor(private taskService: TaskService) {}
  
  ngOnInit(): void {
    this.findAll()
  }

  findAll() {
    this.taskService.findAll().subscribe((response) => {
      this.tasks = response
    })
  }
}
