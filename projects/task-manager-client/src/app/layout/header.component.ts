import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ITask } from '../core/model/task';
import {
  IDialogDataConfig,
  ICloseDialogConfig
} from '../task-dialog/task-dialog.component';
import { IStatusType } from '../core/model/status-type';
import { TaskService } from '../services/task.service';
import { IUserInfo } from '../core/model/user-info';
import { ToastService } from '../services/toast.service';
import { Utils } from '../shared/utils';
import { UserService } from '../services/user.service';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Output() openTaskDialog = new EventEmitter<boolean>();
  public dialogData: IDialogDataConfig;
  public statusTypes: IStatusType[];
  public task: ITask;
  count: number;
  public isVisible = false;
  public operation = 'new';
  readonly DELIMITER = '-';
  private userInfo: IUserInfo;

  constructor(
    private userService: UserService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    // private authService: AuthService
    public toastService: ToastService // UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION,
  ) {}

  hadnleSignOut(): void {
    // this.authService.signOut();
    // UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
  }

  handleOpenTaskDialog() {
    this.isVisible = true;
    this.operation = 'new';
    this.dialogData = {
      task: {} as ITask,
      statusTypes: []
    };
  }

  closeTaskDialog(result: ICloseDialogConfig) {
    this.isVisible = false;
    if (this.operation === 'new') {
      const taskPayload = {
        ...result.data.task,
        creationDate: Utils.getCurrentDate(),
        dueDate: Utils.getDueDate(result.data.task.dueDate, this.DELIMITER),
        status: 'new',
        subTaks: [],
        comments: []
      };
      Object.assign(taskPayload, this.userInfo);
      this.taskService
        .addTask(taskPayload, this.userInfo.userId)
        .subscribe((newTask) => {
          this.showSuccess('Success fully added');
        });
    }
    this.operation = '';
  }

  showSuccess(messages) {
    this.toastService.show(messages, {
      classname: 'bg-success text-light',
      delay: 10000
    });
  }
}
