import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICloseDialogConfig } from '../task-dialog/task-dialog.component';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { ITask } from '../core/model/task';
import { UserService } from '../services/user.service';
import { IUserInfo } from '../core/model/user-info';
import { Router } from '@angular/router';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  public isVisible = false;
  public task: ITask;
  public tasks: ITask[];
  storeSub: Subscription;
  public operation = 'new';
  public userInfo: IUserInfo;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userInfo = this.userService.getUserInfo();
    if (!this.userInfo) {
      this.router.navigate(['/login']);
    } else {
      this.storeSub = this.taskService
        .getTasksByUser(this.userInfo.userId)
        .subscribe((tasks) => (this.tasks = tasks));
      this.storeSub = this.taskService.stateChanged.subscribe((state) => {
        if (state) {
          console.log(state);
          this.tasks = state.tasks;
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  openTaskDialog(isOpen: boolean) {
    this.isVisible = isOpen;
    this.operation = 'new';
    this.task = {} as ITask;
  }

  deleteTask(taskId: number) {
    this.taskService
      .removeTask(taskId, this.userInfo.userId)
      .subscribe((removedTask) => {
        console.log(removedTask);
      });
  }

  closeTaskDialog(result: ICloseDialogConfig) {
    this.isVisible = false;
    this.operation = '';
  }
}
