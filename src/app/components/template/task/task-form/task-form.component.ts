import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/task';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  
  @Input() isUpdate: Boolean = false;
  @Input() label: String = '';

  public taskForm: FormGroup;
  public users: User[] = [];
  public task?: Task
  public idTask:any = null;

  constructor
  (
    private fb: FormBuilder, private taskService: TaskService, private userService: UserService,
    private datePipe: DatePipe, private toastr: ToastrService, private router: Router,
    private actRoute: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]], // Defina o valor inicial como uma string vazia ('')
      description: ['', [Validators.required, Validators.maxLength(255)]],
      userId: [null, Validators.required],
      priority: [null, Validators.required],
      deadline: [null, Validators.required]
    });
    
  }
  ngOnInit(): void {
    if(this.isUpdate) {
      this.idTask = this.actRoute.snapshot.paramMap.get('id');
      this.taskService.findById(this.idTask).subscribe((response) => {
        this.task = response;
        const formattedDeadline = this.datePipe.transform(this.task!.deadline, 'yyyy-MM-dd');
        this.taskForm.patchValue({
          title: this.task!.title,
          description: this.task!.description,
          userId: this.task!.responsible!.id,
          priority: this.task!.priority,
          deadline: formattedDeadline,
        });
      })
    }
    this.findAllUsers();
    console.log(this.isUpdate)
  }

  validateForm() {
    if(this.taskForm.invalid) {
      for (const controlName in this.taskForm.controls) {
        if (this.taskForm.controls[controlName].invalid) {
          this.taskForm.controls[controlName].markAsTouched();
        }
      }
      return;
    }
    let deadline = this.convertStringToLocalDateTime(this.taskForm.get('deadline')!.value);
    this.taskForm.get('deadline')?.setValue(deadline);
    this.isUpdate ? this.updateTask() : this.saveTask()
  }
  
  saveTask() {
    this.taskService.insert(this.taskForm.value).subscribe(response => {
        this.toastr.success("Dados salvos com sucesso", '', {positionClass: 'toast-bottom-center'});
        this.router.navigate(['/tarefas']);
      
    }, error => {
      console.log(error.error.errors)
    })
  }
  updateTask() {
    this.taskService.update(this.idTask, this.taskForm.value).subscribe((response) => {
      if(response) {
        this.toastr.success("Dados atualizados com sucesso", '', {positionClass: 'toast-bottom-center'})
        this.router.navigate(['/tarefas']);
      }
    }, err => {
      this.toastr.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom'})
    })
  }
  convertStringToLocalDateTime(dataString: string) {
    return this.datePipe.transform(dataString, 'yyyy-MM-ddTHH:mm:ss');
  }
  findAllUsers() {
    this.userService.findAll().subscribe((response) => {
      this.users = response;
    })
  }
}
