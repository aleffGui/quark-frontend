import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/services/task.service';
import { TaskReadAllComponent } from '../../../view/task/task-read-all/task-read-allcomponent';

@Component({
  selector: 'app-task-filter-form',
  templateUrl: './task-filter-form.component.html',
  styleUrls: ['./task-filter-form.component.css']
})
export class TaskFilterFormComponent {

  public filterTaskForm: FormGroup;
  @Input() users: any;

  constructor( private fb: FormBuilder, private taskReadAllComponent: TaskReadAllComponent) {
    this.filterTaskForm = this.fb.group({
      id: [''],
      titleOrDescription: [''],
      userId: [''],
      status: [''],
      priority: ['']
    });
  }
  filter() {
    const formValues = this.filterTaskForm.value;

    const filterParams:any = {
      id: formValues.id,
      titleOrDescription: formValues.titleOrDescription,
      userId: formValues.userId,
      status: formValues.status,
      priority: formValues.priority
    };

    const filterString = Object.keys(filterParams)
      .filter(key => filterParams[key] !== null)
      .map(key => `${key}=${filterParams[key]}`)
      .join('&');
 
    this.taskReadAllComponent.findAllTasks(filterString);
  }

  clearFilter() {
    this.filterTaskForm.reset();
    this.taskReadAllComponent.findAllTasks();
  }
}
