import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create the user service', () => {
    const dummyUserListResponse = {
      userId: '1',
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-10-5'
    };

    service.fetchUser('srini1').subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/users/srini1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);

    expect(service.getUserInfo()).toEqual(dummyUserListResponse);
  });

  it('should create the user service post', () => {
    const userPayload = {
      userId: '1',
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-10-5'
    };

    const dummyUserListResponse = [
      {
        userId: '1',
        userName: 'srini1',
        email: 'sri@sri.com',
        creationDate: '2020-10-5'
      }
    ];

    service.findOrCreateUser(userPayload).subscribe((res) => {
      expect(res).toEqual(userPayload);
    });

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUserListResponse);
  });

  it('should create the user error', () => {
    const userPayload = {
      userId: '1',
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-10-5'
    };

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = 'Invalid request parameters';
    let response: any;
    let errResponse: any;

    service.findOrCreateUser(userPayload).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(data, mockErrorResponse);
    expect(errResponse.error).toBe(data);
  });

  it('should create the user error', () => {
    const userPayload = {
      userId: '1',
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: '2020-10-5'
    };

    const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
    const data = new Error('Invalid request parameters');
    let response: any;
    let errResponse: any;

    service.findOrCreateUser(userPayload).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );

    const req = httpMock.expectOne('http://localhost:3000/users');
    expect(req.request.method).toBe('POST');
    req.flush(data, mockErrorResponse);
    expect(errResponse.statusText).toBe(undefined);
  });
});
