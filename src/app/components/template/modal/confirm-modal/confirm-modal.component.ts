import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  @Input() idObject?: any;
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() objectName?: string;
  @Input() labelButton?: string;
  @Input() classButton?: string;
  @Input() functionName?: string;

  constructor(public modal: NgbActiveModal, private taskService: TaskService, 
    private toastService: ToastrService, private router: Router){}
  
  ngOnInit(): void {
  }

  confirm() {
    switch(this.functionName) {
      case 'deleteTask':
        this.deleteTask();
        break;
      case 'markTaskAsComplete':
        this.markTaskAsComplete();
        break;  
    }
  }
  markTaskAsComplete() {
    this.taskService.markTaskAsComplete(this.idObject).subscribe(response => {
      this.modal.close();
      this.toastService.success("Tarefa concluída com sucesso", '', {positionClass: 'toast-bottom-center'});
    }, err => {
      this.toastService.error("Não foi possível concluir", '', {positionClass: 'toast-bottom-center'});
    })
  }
  deleteTask() {
    this.taskService.delete(this.idObject).subscribe(response => {
      this.modal.close();
      this.toastService.success("Tarefa removida com sucesso", '', {positionClass: 'toast-bottom-center'});
    }, err => {
      this.toastService.error("Não foi possível remover", '', {positionClass: 'toast-bottom-center'});
    })
  }
}
