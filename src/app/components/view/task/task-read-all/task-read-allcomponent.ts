import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

  tasks: any = [];
  users: User[] = [];

  constructor(private taskService: TaskService, private ngbModal: NgbModal) {}
  
  ngOnInit(): void {
    this.findAlTasks();
  }

  findAlTasks() {
    this.taskService.findAll().subscribe((response) => {
      this.tasks = response
    })
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
    modalRef.componentInstance.title = "Conluir Tarefa";
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
    modalRef.componentInstance.responsible = `${task.responsible.name} ${task.responsible.lastName}`,
    modalRef.componentInstance.status = `${task.status ? 'Concluída' : 'Em Andamento'}`
  }
}
