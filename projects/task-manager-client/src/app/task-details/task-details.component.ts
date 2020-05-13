import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import {
  ICloseDialogConfig,
  IDialogDataConfig
} from '../task-dialog/task-dialog.component';
import { IStatusType } from '../core/model/status-type';
import { ITask, ISubTask } from '../core/model/task';
import { IComment } from '../core/model/comment';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { Utils } from '../shared/utils';

@Component({
  selector: 'task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  public dialogData: IDialogDataConfig;
  public statusTypes: IStatusType[];
  public task: ITask;
  count: number;
  public isVisible = false;
  public operation = 'new';
  public subTasks: ISubTask[] = [];
  public comments: IComment[] = [];
  readonly DELIMITER = '-';
  public isCompleted = false;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService
  ) {}

  ngOnInit() {
    this.count = 0;
    const id = +this.route.snapshot.paramMap.get('id');
    this.taskService
      .getStatusTypes()
      .subscribe((statusTypes) => (this.statusTypes = statusTypes));
    this.taskService.getSubTasks(id).subscribe((subTasks) => {
      this.subTasks = subTasks.map((subTask) => {
        subTask.isCompleted = false;
        return subTask;
      });
    });
    this.taskService
      .getComments(id)
      .subscribe((comments) => (this.comments = comments));
    this.taskService.getTask(id).subscribe((task) => {
      this.handleTask(task);
    });
  }

  handleTask(task: ITask) {
    task.creationDate = this.getNgbDateFormat(task.creationDate);
    task.dueDate = this.getNgbDateFormat(task.dueDate);
    this.task = task;
  }

  getNgbDateFormat(dueDate) {
    const dateArray = dueDate.split('-');
    return {
      year: parseInt(dateArray[0], 10),
      month: parseInt(dateArray[1], 10),
      day: parseInt(dateArray[2], 10)
    };
  }

  getDateFormat(date) {
    return date
      ? date.year + this.DELIMITER + date.month + this.DELIMITER + date.day
      : '';
  }

  handleUpdateTask() {
    const userInfo = this.userService.getUserInfo();
    const updateTaskPayload = {
      userId: userInfo.userId,
      taskId: this.task.taskId,
      title: this.task.title,
      description: this.task.description,
      status: this.task.status,
      dueDate: this.getDateFormat(this.task.dueDate)
    };

    this.taskService
      .updateTask(updateTaskPayload, this.task.taskId, userInfo.userId)
      .subscribe((tasks) => {
        console.log('updateTask', tasks);
        this.showSuccess('Success fully updated');
      });
  }

  showSuccess(messages) {
    this.toastService.show(messages, {
      classname: 'bg-success text-light',
      delay: 10000
    });
  }

  openTaskDialog(isOpen: boolean) {
    this.isVisible = isOpen;
    this.operation = 'new';
    this.dialogData = {
      task: {} as ITask,
      statusTypes: this.statusTypes
    };
  }

  handleSubtask() {
    this.isVisible = true;
    this.operation = 'subTask';
    this.dialogData = {
      task: {} as ITask,
      statusTypes: this.statusTypes
    };
  }

  closeTaskDialog(result: ICloseDialogConfig) {
    this.isVisible = false;
    if (this.operation === 'subTask') {
      const subTaskPayload = {
        taskId: this.task.taskId,
        creationDate: Utils.getCurrentDate(),
        ...result.data.task,
        dueDate: this.getDateFormat(result.data.task.dueDate),
        isCompleted: false
      };

      this.taskService
        .addSubTask(subTaskPayload, this.task.taskId)
        .subscribe((subTasks) => {
          this.subTasks = subTasks;
        });
    }
    this.operation = '';
  }

  navigateHome() {
    this.router.navigate(['/tasks']);
  }

  receiveComment($event) {
    const commentPayload = {
      ...$event,
      taskId: this.task.taskId
    };
    this.taskService
      .addComment(commentPayload, this.task.taskId)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }

  deleteComment($event) {
    // TODO: Need to access service call to delete comments
    console.log($event);
    this.comments = $event;
  }

  handleSubtaskStatus(event, subTaskIndex) {
    // TODO: Need to access service call to update completed status
    this.subTasks[subTaskIndex].isCompleted = event.target.checked;
  }

  selectedValueChange(selectedStatus) {
    this.task.status = selectedStatus;
  }
}
