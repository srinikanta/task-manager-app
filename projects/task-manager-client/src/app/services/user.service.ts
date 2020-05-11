import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { throwError, Observable } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IStoreState } from '../shared/interfaces';
import { HttpHeaders } from '@angular/common/http';
import { IUserInfo } from '../core/model/user-info';

const httpHeaders = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

export enum UserStoreActions {
  ADDUSER = 'ADD_USER',
  GETUSER = 'GET_USER',
  GETUSERS = 'GET_USERS'
}

@Injectable()
export class UserService extends ObservableStore<IStoreState> {
  constructor(private http: HttpClient) {
    super({ trackStateHistory: true });
  }

  private fetchUser(userName) {
    return this.http
      .get<IUserInfo>(`http://localhost:3000/getUser/${userName}`)
      .pipe(
        map((userInfo) => {
          this.setState({ userInfo }, UserStoreActions.GETUSER);
          return userInfo;
        }),
        catchError(this.handleError)
      );
  }

  addUser(userPayload: IUserInfo) {
    return this.http
      .post<IUserInfo>(
        'http://localhost:3000/addUser',
        userPayload,
        httpHeaders
      )
      .pipe(
        switchMap((user) => {
          console.log(user);
          return this.fetchUser(user.userName);
        }),
        catchError(this.handleError)
      );
  }

  public getUserInfo() {
    return this.getState().userInfo;
  }

  findOrCreateUser(user: IUserInfo) {
    return this.http
      .post<IUserInfo>('http://localhost:3000/addUser', user, httpHeaders)
      .pipe(
        map((response) => {
          console.log(response);
          const userInfo = response[0];
          this.setState({ userInfo }, UserStoreActions.GETUSER);
          return response[0];
        }),
        catchError(this.handleError)
      );
  }

  private fetchUsers() {
    return this.http.get<IUserInfo>(`http://localhost:3000/getUsers`).pipe(
      map((users) => {
        return users;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return throwError(errMessage);
    }
    return throwError(error || 'Server error');
  }
}
