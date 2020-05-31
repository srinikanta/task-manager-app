import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { By } from 'protractor';

describe('HeaderComponent', () => {
  beforeEach(async(() => {
    let userService: UserService;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent, TaskDialogComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        },
        {
          provide: UserService,
          useValue: {
            findOrCreateUser: () => of({}),
            getUserInfo: () => of({})
          }
        },
        {
          provide: TaskService,
          useValue: {
            getAllTasks: () => of([])
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the header component', () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const headerComponent = fixture.componentInstance;
    expect(headerComponent).toBeTruthy();
  });

  it(`should render component with 'Task Manager' title`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const titleAnchor = compiled.querySelector('a');
    expect(titleAnchor.textContent.trim()).toEqual('Task Manager');
  });

  it(`should render component with button having 'Create Task' text`, () => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const headerButtons = compiled.querySelector('button');
    expect(headerButtons.textContent.trim()).toEqual('Create Task');
  });

  it('should call handleOpenTaskDialog', fakeAsync(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const headerComponent = fixture.componentInstance;
    spyOn(headerComponent, 'handleOpenTaskDialog').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(headerComponent.handleOpenTaskDialog).toHaveBeenCalled();
    });
  }));

  it('should call hadnleSignOut', fakeAsync(() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    const headerComponent = fixture.componentInstance;
    spyOn(headerComponent, 'hadnleSignOut').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      '.btn-outline-danger'
    );
    console.log('button:::', button);
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(headerComponent.hadnleSignOut).toHaveBeenCalled();
    });
  }));
  /*
  it('should call hadnleSignOut', (() => {
    const fixture = TestBed.createComponent(HeaderComponent);
    const de = fixture.debugElement;
    fixture.detectChanges();
    de.query(By.directive(TaskDialogComponent))
    //console.log(childEl);
    expect(true).toBeTruthy();
  }));
  */
});
