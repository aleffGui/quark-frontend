import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-filter-task-form',
  templateUrl: './filter-task-form.component.html',
  styleUrls: ['./filter-task-form.component.css']
})
export class FilterTaskFormComponent {

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
