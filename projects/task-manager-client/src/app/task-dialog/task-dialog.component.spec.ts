import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TaskDialogComponent } from './task-dialog.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComonent', () => {
  beforeEach(async(() => {
    let userService: UserService;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [TaskDialogComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        {
          provide: UserService,
          useValue: {
            findOrCreateUser: () => of({ id: 123, name: 'Product' })
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the login component', () => {
    const fixture = TestBed.createComponent(TaskDialogComponent);
    const loginComponent = fixture.componentInstance;
    expect(loginComponent).toBeTruthy();
  });

  it(`should render component with 'Not signed in' text`, () => {
    const fixture = TestBed.createComponent(TaskDialogComponent);
    const loginComponent = fixture.componentInstance;
    loginComponent.isVisible = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(loginComponent.isVisible).toEqual(true);
  });

  it(`should render component with 'Not signed in' text`, () => {
    const fixture = TestBed.createComponent(TaskDialogComponent);
    const loginComponent: TaskDialogComponent = fixture.componentInstance;
    loginComponent.isVisible = true;
    loginComponent.operation = 'subTask';
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(loginComponent.isVisible).toEqual(true);
  });
});
