import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskDetailsComponent } from './task-details.component';
import { HeaderComponent } from '../layout/header.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from 'protractor';
import {
  NgbCalendar,
  NgbInputDatepicker,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';

describe('TaskDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TaskDetailsComponent, NgbInputDatepicker],
      providers: [
        //{provide: Router, useValue: {navigate: () => of({})}},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (id: number) => {
                  id: 1;
                }
              }
            }
          }
        },
        {
          provide: TaskService,
          useValue: {
            getTask: (id: number) =>
              of({
                taskId: 9,
                title: 'sasas',
                description: 'Task Test Description',
                status: 'inProgress',
                creationDate: '2020-05-09T14:03:21.000Z',
                dueDate: '2020-05-09T18:30:00.000Z',
                updatedOn: null
              }),
            getSubTasks: (id: number) =>
              of([
                {
                  title: 'Subtask Title1',
                  description: 'Subtask Description1',
                  dueDate: '2020-05-25',
                  taskId: 9,
                  creationDate: '2020-05-21'
                }
              ]),
            getStatusTypes: () => of({}),
            getAllTasks: () => of([]),
            removeTask: (taskId: string, userId: number) => of([]),
            getTasksByUser: () => of({}),
            getComments: (id: number) => of({}),
            stateChanged: of({
              tasks: [
                {
                  taskId: 9,
                  title: 'sasas',
                  description: 'Task Test Description',
                  status: 'inProgress',
                  creationDate: '2020-05-09T14:03:21.000Z',
                  dueDate: '2020-05-09T18:30:00.000Z',
                  updatedOn: null
                }
              ]
            })
          }
        },
        {
          provide: UserService,
          useValue: {
            findOrCreateUser: () => of({}),
            getUserInfo: () => of({})
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the task list component', () => {
    const fixture = TestBed.createComponent(TaskDetailsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the init', () => {
    const fixture = TestBed.createComponent(TaskDetailsComponent);
    const app = fixture.componentInstance;
    const taskService = TestBed.get(TaskService);
    spyOn(taskService, 'getTask')
      .withArgs(9)
      .and.returnValue(
        of({
          taskId: 9,
          title: 'sasas',
          description: 'Task Test Description',
          status: 'inProgress',
          creationDate: '2020-05-09T14:03:21.000Z',
          dueDate: '2020-05-09T18:30:00.000Z',
          updatedOn: null
        })
      )
      .and.callThrough();
    app.ngOnInit();
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });

  it('should call update task', fakeAsync(() => {
    const fixture = TestBed.createComponent(TaskDetailsComponent);
    const detailsComponent = fixture.componentInstance;
    const taskService = TestBed.get(TaskService);
    spyOn(detailsComponent, 'handleUpdateTask').withArgs().and.callThrough();
    spyOn(taskService, 'getTask')
      .withArgs(9)
      .and.returnValue(
        of({
          taskId: 9,
          title: 'sasas',
          description: 'Task Test Description',
          status: 'inProgress',
          creationDate: '2020-05-09T14:03:21.000Z',
          dueDate: '2020-05-09T18:30:00.000Z',
          updatedOn: null
        })
      )
      .and.callThrough();
    detailsComponent.ngOnInit();
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('.save-task');
    button.click();
    tick();
    expect(detailsComponent).toBeTruthy();
  }));

  it('should call add sub task', fakeAsync(() => {
    const fixture = TestBed.createComponent(TaskDetailsComponent);
    const detailsComponent = fixture.componentInstance;
    const taskService = TestBed.get(TaskService);
    spyOn(detailsComponent, 'handleSubtask').withArgs().and.callThrough();
    spyOn(taskService, 'getTask')
      .withArgs(9)
      .and.returnValue(
        of({
          taskId: 9,
          title: 'sasas',
          description: 'Task Test Description',
          status: 'inProgress',
          creationDate: '2020-05-09T14:03:21.000Z',
          dueDate: '2020-05-09T18:30:00.000Z',
          updatedOn: null
        })
      )
      .and.callThrough();
    detailsComponent.ngOnInit();
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector(
      '.sub-task-btn'
    );
    button.click();
    tick();
    expect(detailsComponent).toBeTruthy();
  }));
});
