import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { IComment } from './comment';

export interface IBaseTask {
  title: string;
  description: string;
  status: string;
  creationDate?: NgbDateStruct | string;
  dueDate: NgbDateStruct | string;
}

export interface ITask extends IBaseTask {  
  taskId?: number;
  userId?: string | number;
}

export interface ISubTask extends IBaseTask {
  subTaskId?: number;
  isCompleted?: boolean;
}


