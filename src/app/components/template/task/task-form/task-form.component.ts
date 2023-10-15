import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  
  public taskForm: FormGroup;
  public users: User[] = [];

  constructor
  (
    private fb: FormBuilder, private taskService: TaskService, private userService: UserService,
    private datePipe: DatePipe, private toastr: ToastrService, private route: Router
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
    this.findAllUsers();
  }

  // validateForm() {
  //   if(this.taskForm.invalid) {
  //     for (const controlName in this.taskForm.controls) {
  //       if (this.taskForm.controls[controlName].invalid) {
  //         this.taskForm.controls[controlName].markAsTouched();
  //       }
  //     }
  //     return;
  //   }
  //   this.saveTask()
  // }
  
  saveTask() {
    let deadline = this.convertStringToLocalDateTime(this.taskForm.get('deadline')!.value);
    this.taskForm.get('deadline')?.setValue(deadline);
    this.taskService.insert(this.taskForm.value).subscribe(response => {
        this.toastr.success("Dados salvos com sucesso", '', {positionClass: 'toast-botom'});
        this.route.navigate(['/tarefas']);
      
    }, error => {
      console.log(error.error.errors)
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
