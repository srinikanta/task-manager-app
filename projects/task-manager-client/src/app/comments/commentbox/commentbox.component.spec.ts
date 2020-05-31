import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormBuilder } from '@angular/forms';
import { CommentboxComponent } from './commentbox.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComonent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CommentboxComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: { navigate: () => {} } }
      ]
    }).compileComponents();
  }));

  it('should create the login component', () => {
    const fixture = TestBed.createComponent(CommentboxComponent);
    const loginComponent = fixture.componentInstance;
    expect(loginComponent).toBeTruthy();
  });

  it(`should render component with 'Post Comment' button`, () => {
    const fixture = TestBed.createComponent(CommentboxComponent);
    const loginComponent: CommentboxComponent = fixture.componentInstance;
    loginComponent.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.btn-success').textContent).toEqual(
      'Post Comment'
    );
  });

  it(`should render component with 'Post Comment' button`, () => {
    const fixture = TestBed.createComponent(CommentboxComponent);
    const loginComponent: CommentboxComponent = fixture.componentInstance;
    loginComponent.ngOnInit();
    fixture.detectChanges();
    loginComponent.commentForm.controls['comment'].setValue('12345678');
    fixture.detectChanges();
    loginComponent.onSubmit();
  });

  it(`should render component with 'Post Comment' button`, () => {
    const fixture = TestBed.createComponent(CommentboxComponent);
    const loginComponent: CommentboxComponent = fixture.componentInstance;
    loginComponent.ngOnInit();
    fixture.detectChanges();
    loginComponent.onSubmit();
  });
});
