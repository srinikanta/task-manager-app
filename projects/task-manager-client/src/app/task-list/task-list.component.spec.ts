import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskListComponent } from './task-list.component';
import { HeaderComponent } from '../layout/header.component';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { By } from 'protractor';

describe('TaskListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TaskListComponent, HeaderComponent],
      providers: [
        //{provide: Router, useValue: {navigate: () => {}}},
        {
          provide: TaskService,
          useValue: {
            getAllTasks: () => of([]),
            removeTask: (taskId: string, userId: number) => of([]),
            getTasksByUser: () => of({}),
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
    const fixture = TestBed.createComponent(TaskListComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should create the init', () => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    fixture.detectChanges();
    console.log(app);
    expect(app).toBeTruthy();
  });

  it('should call Delete', fakeAsync(() => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const taskService = TestBed.get(TaskService);
    const headerComponent: TaskListComponent = fixture.componentInstance;
    spyOn(taskService, 'removeTask')
      .withArgs(9, 5)
      .and.returnValue(of({}))
      .and.callThrough();
    spyOn(headerComponent, 'deleteTask').withArgs(9).and.callThrough();
    headerComponent.ngOnInit();
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector(
      '.delete-class'
    );
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(headerComponent.deleteTask).toHaveBeenCalledWith(9);
    });
  }));

  it('should call openTaskDialog', fakeAsync(() => {
    const fixture = TestBed.createComponent(TaskListComponent);
    const tasListComponent: TaskListComponent = fixture.componentInstance;
    const de = fixture.debugElement;

    //de.query(By.all(HeaderComponent))
    //fixture.detectChanges();
    //let button = fixture.debugElement.nativeElement.querySelector('button');
    //console.log('buttonLLLL', button);
  }));
});
