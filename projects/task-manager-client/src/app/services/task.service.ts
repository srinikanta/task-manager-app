import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { of, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IStoreState } from '../shared/interfaces';
import { ITask, ISubTask } from '../core/model/task';
import { HttpHeaders } from '@angular/common/http';
import { IComment } from '../core/model/comment';

export enum TasksStoreActions {
  AddTask = 'ADD_TASK',
  RemoveTask = 'REMOVE_TASK',
  UpdateTask = 'UPDATE_TASK',
  GetTasks = 'GET_TASKS',
  GetSubTasks = 'GET_SUBTASKS',
  GetComments = 'GET_COMMENTS',
  GetStatusTypes = 'GET_STATUS_TYPES'
}

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class TaskService extends ObservableStore<IStoreState> {
  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
  }

  private fetchTasks(userId) {
    return this.http
      .get<any[]>(`http://localhost:3000/tasksByUserId/${userId}`)
      .pipe(
        map((tasks) => {
          this.setState({ tasks }, TasksStoreActions.GetTasks);
          return tasks;
        }),
        catchError(this.handleError)
      );
  }

  private fetchAllTasks() {
    return this.http.get<any[]>(`http://localhost:3000/tasks`).pipe(
      map((tasks) => {
        this.setState({ tasks }, TasksStoreActions.GetTasks);
        return tasks;
      }),
      catchError(this.handleError)
    );
  }

  private fetchSubTasks(taskId) {
    return this.http
      .get<any[]>(`http://localhost:3000/subTasks/${taskId}`)
      .pipe(
        map((subTasks) => {
          this.setState({ subTasks }, TasksStoreActions.GetSubTasks);
          return subTasks;
        }),
        catchError(this.handleError)
      );
  }

  private fetchComments(taskId) {
    return this.http
      .get<any[]>(`http://localhost:3000/comments/${taskId}`)
      .pipe(
        map((comments) => {
          this.setState({ comments }, TasksStoreActions.GetComments);
          return comments;
        }),
        catchError(this.handleError)
      );
  }

  private fetchStatusTypes() {
    return this.http.get<any[]>('http://localhost:3000/statusTypes').pipe(
      map((statusTypes) => {
        this.setState({ statusTypes }, TasksStoreActions.GetStatusTypes);
        return statusTypes;
      }),
      catchError(this.handleError)
    );
  }

  getAllTasks() {
    const tasks = this.getState().tasks;
    if (tasks && tasks.length) {
      return of(tasks);
    } else {
      return this.fetchAllTasks().pipe(catchError(this.handleError));
    }
  }

  getTasksByUser(userId) {
    const tasks = this.getState().tasks;
    if (tasks && tasks.length) {
      return of(tasks);
    } else {
      return this.fetchTasks(userId).pipe(catchError(this.handleError));
    }
  }

  getSubTasks(taskId) {
    const subTasks = this.getState().subTasks;
    if (subTasks && subTasks.length) {
      return of(subTasks);
    } else {
      return this.fetchSubTasks(taskId).pipe(catchError(this.handleError));
    }
  }

  getComments(taskId) {
    const comments = this.getState().comments;
    if (comments && comments.length) {
      return of(comments);
    } else {
      return this.fetchComments(taskId).pipe(catchError(this.handleError));
    }
  }

  getStatusTypes() {
    const statusTypes = this.getState().statusTypes;
    if (statusTypes && statusTypes.length) {
      return of(statusTypes);
    } else {
      return this.fetchStatusTypes().pipe(catchError(this.handleError));
    }
  }

  getTask(id) {
    return this.getAllTasks().pipe(
      map((tasks) => {
        let filteredTasks = tasks.filter((task) => task.taskId === id);
        const task =
          filteredTasks && filteredTasks.length ? filteredTasks[0] : null;
        this.setState({ tasks }, TasksStoreActions.GetTasks);
        return task;
      }),
      catchError(this.handleError)
    );
  }

  addTask(task: ITask, userId: number | string) {
    return this.http
      .post<ITask>('http://localhost:3000/addTask', task, httpHeaders)
      .pipe(
        switchMap((task) => {
          return this.fetchTasks(userId);
        }),
        catchError(this.handleError)
      );
  }

  addSubTask(subTask: ISubTask, taskId: number) {
    return this.http
      .post<ISubTask>('http://localhost:3000/addSubTask', subTask, httpHeaders)
      .pipe(
        switchMap((subTask) => {
          return this.fetchSubTasks(taskId);
        }),
        catchError(this.handleError)
      );
  }

  addComment(comment: IComment, taskId: number) {
    return this.http
      .post<IComment>('http://localhost:3000/addComment', comment, httpHeaders)
      .pipe(
        switchMap((comment) => {
          return this.fetchComments(taskId);
        }),
        catchError(this.handleError)
      );
  }

  removeTask(taskId: number, userId) {
    return this.http.delete(`http://localhost:3000/deleteTask/${taskId}`).pipe(
      switchMap(() => {
        const tasks = this.deleteLocalTask(taskId);
        this.setState({ tasks }, TasksStoreActions.RemoveTask);
        return this.fetchTasks(userId);
      }),
      catchError(this.handleError)
    );
  }

  updateTask(task: ITask, taskId: number, userId) {
    return this.http
      .put(`http://localhost:3000/updateTask/${taskId}`, task)
      .pipe(
        switchMap((task: ITask) => {
          this.setState({ task }, TasksStoreActions.UpdateTask);
          return this.fetchTasks(userId);
        }),
        catchError(this.handleError)
      );
  }

  private deleteLocalTask(taskId: number) {
    let tasks = this.getState().tasks;
    tasks = tasks.filter((task: ITask) => {
      if (task.taskId === taskId) {
        return false;
      }
      return true;
    });
    return tasks;
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Server error');
  }
}
