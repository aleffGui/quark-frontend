import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-details-modal',
  templateUrl: './task-details-modal.component.html',
  styleUrls: ['./task-details-modal.component.css']
})
export class TaskDetailsModalComponent implements OnInit {

  @Input() idTask?: any;
  @Input() title?: string;
  @Input() modalTitle?: string;
  @Input() description?: string;
  @Input() deadline?: string;
  @Input() priority?: string;
  @Input() user?: string;
  @Input() status?: string;

  constructor(public activeModal: NgbActiveModal){}
 
  ngOnInit(): void {
  
  }
}
