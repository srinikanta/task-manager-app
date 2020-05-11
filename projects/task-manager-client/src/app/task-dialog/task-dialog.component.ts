import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbDateStruct,
  NgbDateAdapter
} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { ITask } from '../core/model/task';
import { IStatusType } from '../core/model/status-type';

export interface ICloseDialogConfig {
  closedResult?: any;
  dismissedResult?: any;
  data: any;
}

export interface IDialogDataConfig {
  statusTypes: IStatusType[];
  task: ITask;
}

@Component({
  selector: 'task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements AfterContentInit {
  @ViewChild('modalContent') modalContent: any;
  @ViewChild('assigneeElement') assigneeElement: ElementRef;
  @ViewChild('statusElement') statusElement: ElementRef;
  @Output() handleClose = new EventEmitter<ICloseDialogConfig>();
  @Input() data: IDialogDataConfig = {} as IDialogDataConfig;
  @Input() operation: string;

  private _isVisible = false;
  private closeDialogResponse: ICloseDialogConfig;
  public model: NgbDateStruct;
  public sss: any;

  constructor(
    private modalService: NgbModal,
    private dateAdapter: NgbDateAdapter<string>
  ) {}

  @Input()
  set isVisible(isVisible: boolean) {
    this._isVisible = isVisible;
    if (this._isVisible) {
      this.openTaskModal();
    }
  }

  get isVisible(): boolean {
    return this._isVisible;
  }

  getDialogTitle() {
    let title = '';
    switch (this.operation) {
      case 'new':
        title = 'New Task';
        break;
      case 'subTask':
        title = 'Sub Task';
        break;
      case 'edit':
        title = 'Edit Task';
        break;
    }
    return title;
  }

  ngAfterContentInit() {
    console.log(this.assigneeElement, this.statusElement);
  }

  openTaskModal() {
    const modalRef = this.modalService
      .open(this.modalContent, {
        centered: true,
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg'
      })
      .result.then(
        (result) => {
          this.closeDialogResponse = {
            closedResult: result,
            dismissedResult: '',
            data: { ...this.data }
          };
          this.handleClose.emit(this.closeDialogResponse);
        },
        (reason) => {
          this.closeDialogResponse = {
            closedResult: '',
            dismissedResult: reason,
            data: null
          };
          this.handleClose.emit(this.closeDialogResponse);
        }
      );
  }
}
