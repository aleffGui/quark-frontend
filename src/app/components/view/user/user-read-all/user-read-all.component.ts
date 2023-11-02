import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfirmModalComponent } from 'src/app/components/template/modal/confirm-modal/confirm-modal.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-read-all',
  templateUrl: './user-read-all.component.html',
  styleUrls: ['./user-read-all.component.css']
})
export class UserReadAllComponent implements OnInit {

  loading = true;
  users:any;
  pageSize = 20;
  page = 0;
  count = 0;
  filterString='';

  constructor(private ngbModal: NgbModal, private userService: UserService, private toastService: ToastrService) {}
  
  ngOnInit(): void {
    this.findAllUsersPaginated()
  }

  findAllUsersPaginated(filter = '') {
    this.userService.findAllPaginated(filter, this.page).subscribe((response) => {
      if(response) {
        this.loading = false;
        this.users = response;
        this.count = response.totalElements;
      }
    }, err => {
      this.loading = false;
      this.toastService.error("Algum erro ocorreu", '', {positionClass: 'toast-bottom-center'})
    })
  }

  handlePageChange(event:any) {
    this.page = event - 1;
    this.findAllUsersPaginated(this.filterString);
  }
  onFilterStringChanged(newFilterString:string) {
    this.page = 0;
    this.filterString = newFilterString;
    this.findAllUsersPaginated(this.filterString);
  }
  openConfirmationDelete(user:any) {
    const modalRef = this.ngbModal.open(ConfirmModalComponent)
    modalRef.componentInstance.idObject = `${user.id}`;
    modalRef.componentInstance.title = "Remover Usuário";
    modalRef.componentInstance.subtitle = "Tem certeza que deseja remover o usuário";
    modalRef.componentInstance.objectName = `${user.firstName} ${user.lastName}`
    modalRef.componentInstance.labelButton = "Remover";
    modalRef.componentInstance.classButton = "danger"
    modalRef.componentInstance.functionName = "deleteUser";
    modalRef.result.then((value) => {
      if(value != 'close')
        this.ngOnInit();
    })
  }
}
