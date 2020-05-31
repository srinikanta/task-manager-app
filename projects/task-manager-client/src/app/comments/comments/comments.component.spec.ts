import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommentsComponent } from './comments.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComonent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CommentsComponent],
      providers: [{ provide: Router, useValue: { navigate: () => {} } }]
    }).compileComponents();
  }));

  it('should create the login component', () => {
    const fixture = TestBed.createComponent(CommentsComponent);
    const loginComponent = fixture.componentInstance;
    expect(loginComponent).toBeTruthy();
  });

  it(`should render component with button having 'No Comments found' text`, () => {
    const fixture = TestBed.createComponent(CommentsComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const h6Tag = compiled.querySelector('h6');
    expect(h6Tag.textContent.trim()).toEqual('No Comments found');
  });

  it(`should render component with button having 'No Comments found' text`, () => {
    const fixture = TestBed.createComponent(CommentsComponent);
    const app: CommentsComponent = fixture.componentInstance;
    app.postComment = [{ commentTxt: 'hi', commentDate: '2020-10-10' }];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const buttonEle = compiled.querySelector('.btn-danger');
    expect(buttonEle.nodeName.trim()).toEqual('BUTTON');
  });

  it('should click login button', fakeAsync(() => {
    const fixture = TestBed.createComponent(CommentsComponent);
    const app: CommentsComponent = fixture.componentInstance;
    app.postComment = [{ commentTxt: 'hi', commentDate: '2020-10-10' }];
    fixture.detectChanges();
    const loginComponent = fixture.componentInstance;
    spyOn(loginComponent, 'removeComment').and.callThrough();

    let button = fixture.debugElement.nativeElement.querySelector(
      '.btn-danger'
    );
    console.log('button:::', button);
    button.click();
    tick();
    fixture.whenStable().then(() => {
      expect(loginComponent.removeComment).toHaveBeenCalled();
    });
  }));
});
