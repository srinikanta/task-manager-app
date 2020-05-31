import { Component, OnInit } from '@angular/core';
import {
  AuthService,
  GoogleLoginProvider,
  SocialUser
} from 'angularx-social-login';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { IUserInfo } from '../core/model/user-info';
import { Utils } from '../shared/utils';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  items = [
    { name: 'New', value: 'new' },
    { name: 'In Progress', value: 'inProgress' },
    { name: 'Completed', value: 'completed' }
  ];
  selectedValue = 'new';

  constructor(
    // private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION
    /*
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
    */
  }

  signInWithGoogle(): void {
    // UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

    const userPayload: IUserInfo = {
      userName: 'srini1',
      email: 'sri@sri.com',
      creationDate: Utils.getCurrentDate()
    };
    this.userService.findOrCreateUser(userPayload).subscribe((newUser) => {
      this.router.navigate(['/tasks']);
    });
  }
}
