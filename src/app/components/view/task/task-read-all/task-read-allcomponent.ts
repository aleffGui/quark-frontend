import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';
import { ConfirmModalComponent } from 'src/app/components/template/modal/confirm-modal/confirm-modal.component';
import { TaskDetailsModalComponent } from 'src/app/components/template/modal/information-modal/task-details-modal.component';
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
  
  @ViewChild("tableTasks") tableTasks: any;
  
  loading = true;
  tasks: any = [];
  users: User[] = [];
  pageSize = 20;
  page = 0;
  count = 0;
  filterString='';
  
  constructor(private taskService: TaskService, private ngbModal: NgbModal, private userService: UserService, private toastService: ToastrService) {}
  
  ngOnInit(): void {
    this.findAllTasks(this.filterString);
    this.findAllUsers();
  }

  findAllTasks(filterString='') {
  
    this.taskService.findAll(filterString, this.page).subscribe((response) => {
      if(response) {
        this.loading = false;
        this.tasks = response;
        this.count = response.totalElements;
      }
    }, err => {
      this.loading = false;
      this.toastService.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom-center'})
    })
  }

  findAllUsers() {
    this.userService.findAll().subscribe((response) => {
      this.users = response;
    })
  }
  handlePageChange(event:any) {
    this.page = event - 1;
    this.findAllTasks();
  }
  openConfirmationDelete(task:any) {
    const modalRef = this.ngbModal.open(ConfirmModalComponent)
    modalRef.componentInstance.idObject = `${task.id}`;
    modalRef.componentInstance.title = "Remover Tarefa";
    modalRef.componentInstance.subtitle = "Tem certeza que deseja remover a tarefa";
    modalRef.componentInstance.objectName = `${task.title}`
    modalRef.componentInstance.labelButton = "Remover";
    modalRef.componentInstance.classButton = "danger"
    modalRef.componentInstance.functionName = "deleteTask";
    modalRef.result.then((value) => {
      if(value != 'close')
        this.ngOnInit();
    })
  }
  openConfirmationMarkAsComplete(task:any) {
    const modalRef = this.ngbModal.open(ConfirmModalComponent)
    modalRef.componentInstance.idObject = `${task.id}`;
    modalRef.componentInstance.title = "Concluir Tarefa";
    modalRef.componentInstance.subtitle = "Tem certeza que deseja marcar como concluída a tarefa";
    modalRef.componentInstance.objectName = `${task.title}`
    modalRef.componentInstance.labelButton = "Concluir";
    modalRef.componentInstance.classButton = "success"
    modalRef.componentInstance.functionName = "markTaskAsComplete";
    modalRef.result.then((value) => {
      if(value != 'close')
        this.ngOnInit();
    })
  }
  
  openDetailsModal(task:any) {
    const modalRef = this.ngbModal.open(TaskDetailsModalComponent)
    modalRef.componentInstance.idTask = `${task.id}`;
    modalRef.componentInstance.modalTitle = "Detalhes da Tarefa";
    modalRef.componentInstance.title = `${task.title}`;
    modalRef.componentInstance.description = `${task.description}`;
    modalRef.componentInstance.priority = `${task.priority}`;
    modalRef.componentInstance.deadline = `${task.deadline}`;
    modalRef.componentInstance.user = `${task.user.firstName} ${task.user.lastName}`,
    modalRef.componentInstance.status = `${task.status ? 'Concluída' : 'Em Andamento'}`
  }
}
