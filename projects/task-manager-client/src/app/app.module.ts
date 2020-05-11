import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { TaskService } from './services/task.service';
import { CommonModule } from '@angular/common';

import { CommentboxComponent } from './comments/commentbox/commentbox.component';
import { CommentsComponent } from './comments/comments/comments.component';
import { ChildboxComponent } from './comments/childbox/childbox.component';
import { DatacontainerDirective } from './comments/comments/comments.component';

import { LoginComponent } from './login/login.component';
import { FooterComponent, HeaderComponent } from './layout';

import { DatePipe } from '@angular/common';
import {
  AuthServiceConfig,
  GoogleLoginProvider,
  SocialLoginModule
} from 'angularx-social-login';
import { ToastService } from './services/toast.service';
import { ToastsContainer } from './toast/toasts-container.component';
import { UserService } from './services/user.service';

// UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION
/*
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(<Need to provide google client id>)
  }
]);

export function provideConfig() {
  return config;
}
*/

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDialogComponent,
    TaskDetailsComponent,
    CommentboxComponent,
    CommentsComponent,
    ChildboxComponent,
    DatacontainerDirective,
    LoginComponent,
    FooterComponent,
    HeaderComponent,
    ToastsContainer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule
    // UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION
    //SocialLoginModule
  ],
  entryComponents: [ChildboxComponent],
  providers: [
    TaskService,
    DatePipe,
    ToastService,
    UserService
    // UN COMMENT BELOW CODE TO USE GOOGLE AUTHENTICATION
    //{
    //  provide: AuthServiceConfig,
    //  useFactory: provideConfig
    //}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
