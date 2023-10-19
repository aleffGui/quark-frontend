import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from 'src/app/components/template/modal/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-read-all',
  templateUrl: './user-read-all.component.html',
  styleUrls: ['./user-read-all.component.css']
})
export class UserReadAllComponent implements OnInit {

  users:any;
  pageSize = 20;
  page = 0;
  count = 0;
  filterString='';

  constructor(private ngbModal: NgbModal, private userService: UserService) {}
  
  ngOnInit(): void {
    this.findAllUsersPaginated()
  }

  findAllUsersPaginated(filter = '') {
    this.userService.findAllPaginated(filter, this.page).subscribe((response) => {
      this.users = response;
      this.count = response.totalElements;
    })
  }

  handlePageChange(event:any) {
    this.page = event - 1;
    this.findAllUsersPaginated();
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
}
