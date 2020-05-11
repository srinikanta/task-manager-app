import { ITask, ISubTask } from '../core/model/task';
import { IStatusType } from '../core/model/status-type';
import { IUserInfo } from '../core/model/user-info';
import { IComment } from '../core/model/comment';

export interface IStoreState {
  tasks: ITask[];
  task: ITask;
  subTasks: ISubTask[];
  comments: IComment[];
  statusTypes: IStatusType[];
  userInfo: IUserInfo;
}
