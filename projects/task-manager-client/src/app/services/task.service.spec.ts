import { TestBed, async, inject } from '@angular/core/testing';
import { TaskService } from './task.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { IStatusType } from '../core/model/status-type';

describe('TaskService', () => {
  let service: TaskService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TaskService]
    });
    service = TestBed.get(TaskService);
    service.setStateEmpty();
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create the tasks y id', () => {
    const dummyResponse = [
      {
        title: 'Task Test Tilte',
        description: 'Task Test Description',
        taskId: 9,
        dueDate: '2020-05-10',
        status: 'inProgress'
      }
    ];

    service.getTasksByUser(1).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get sub tasks', () => {
    const dummyResponse = [
      {
        title: 'Subtask Title1',
        description: 'Subtask Description1',
        dueDate: '2020-05-25',
        taskId: 9,
        creationDate: '2020-05-21'
      }
    ];

    service.getSubTasks(1).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/sub-tasks/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get comments', () => {
    const dummyResponse = [
      {
        commentTxt: 'Test comment for task 9',
        taskId: 9,
        commentDate: '2020-05-10'
      }
    ];

    service.getComments(1).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/comments/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get status types', () => {
    const dummyResponse = [
      {
        name: 'new',
        value: 'New'
      }
    ];

    service.getStatusTypes().subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/status-types');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should get task by id', () => {
    const dummyResponse = [
      {
        id: 1,
        title: 'Task Test Tilte',
        description: 'Task Test Description',
        taskId: 9,
        dueDate: '2020-05-10',
        status: 'inProgres'
      }
    ];

    service.getTask(9).subscribe((res) => {
      expect(res).toEqual(dummyResponse[0]);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should remove task by id', () => {
    const dummyResponse = [
      {
        id: 1,
        title: 'Task Test Tilte',
        description: 'Task Test Description',
        taskId: 9,
        dueDate: '2020-05-10',
        status: 'inProgres'
      }
    ];

    service.removeTask(9, 1).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/9');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should add task', () => {
    const dummyResponse = [
      {
        id: 1,
        title: 'Task Test Tilte',
        description: 'Task Test Description',
        taskId: 9,
        dueDate: '2020-05-10',
        status: 'inProgres'
      }
    ];

    service.addTask(dummyResponse[0], 1).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should add sub task', () => {
    const dummyResponse = [
      {
        title: 'Subtask Title1',
        description: 'Subtask Description1',
        dueDate: '2020-05-25',
        taskId: 9,
        creationDate: '2020-05-21',
        status: 'new'
      }
    ];

    service.addSubTask(dummyResponse[0], 9).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/sub-tasks');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should add comments to the task', () => {
    const dummyResponse = [
      {
        commentId: 1,
        commentTxt: 'Test comment for task 9',
        taskId: 9,
        commentDate: '2020-05-10'
      }
    ];

    service.addComment(dummyResponse[0], 9).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/comments');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should update the task', () => {
    const dummyResponse = [
      {
        id: 1,
        title: 'Task Test Tilte',
        description: 'Task Test Description',
        taskId: 9,
        dueDate: '2020-05-10',
        status: 'inProgres'
      }
    ];

    service.updateTask(dummyResponse[0], 9, 1).subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/tasks/9');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyResponse);
  });

  it('should handle the error', () => {
    const dummyResponse = [
      {
        commentId: 1,
        commentTxt: 'Test comment for task 9',
        taskId: 9,
        commentDate: '2020-05-10'
      }
    ];

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = new Error('Invalid request parameters');
    let response: any;
    let errResponse: any;

    service.addComment(dummyResponse[0], 9).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );

    const req = httpMock.expectOne('http://localhost:3000/comments');
    expect(req.request.method).toBe('POST');
    req.flush(data, mockErrorResponse);
    expect(errResponse.statusText).toBe(undefined);
  });

  it('should handle the error', () => {
    const dummyResponse = [
      {
        commentId: 1,
        commentTxt: 'Test comment for task 9',
        taskId: 9,
        commentDate: '2020-05-10'
      }
    ];

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';
    let response: any;
    let errResponse: any;

    service.addComment(dummyResponse[0], 9).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );

    const req = httpMock.expectOne('http://localhost:3000/comments');
    expect(req.request.method).toBe('POST');
    req.flush(data, mockErrorResponse);
    expect(errResponse.error).toBe(data);
  });
});
