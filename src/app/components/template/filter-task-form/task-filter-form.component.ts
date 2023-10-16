import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-filter-form',
  templateUrl: './task-filter-form.component.html',
  styleUrls: ['./task-filter-form.component.css']
})
export class TaskFilterFormComponent {

  public filterTaskForm: FormGroup;

  constructor( private fb: FormBuilder, private taskService: TaskService) {
    this.filterTaskForm = this.fb.group({
      id: [''],
      titleOrDescription: [''],
      userId: [''],
      status: [''],
      priority: ['']
    });
  }
}
