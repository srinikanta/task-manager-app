import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';

describe('LoginComonent', () => {
  beforeEach(async(() => {
    let userService: UserService;
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LoginComponent],
      providers: [
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
    console.log();
    expect(compiled.querySelector('.card-title').textContent).toEqual(
      'Not signed in'
    );
  });
});
