import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComonent', () => {
  beforeEach(async(() => {
    let userService: UserService;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
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
    const fixture = TestBed.createComponent(LoginComponent);
    const loginComponent = fixture.componentInstance;
    expect(loginComponent).toBeTruthy();
  });

  it(`should render component with 'Not signed in' text`, () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.card-title').textContent).toEqual(
      'Not signed in'
    );
  });
  it('should click login button', fakeAsync(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.detectChanges();
    const loginComponent = fixture.componentInstance;
    spyOn(loginComponent, 'signInWithGoogle').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      '.loginBtn--google'
    );
    console.log('button:::', button);
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(loginComponent.signInWithGoogle).toHaveBeenCalled();
    });
  }));
});
