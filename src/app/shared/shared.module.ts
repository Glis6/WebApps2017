import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DRAWING_SERVICE} from "./services/drawing.service";
import {ApiDrawingService} from "./services/api/api-drawing.service";
import {HttpModule} from "@angular/http";
import {LOGGED_IN_USER_SERVICE} from "./services/logged-in-user.service";
import {DummyUserService} from "./services/dummy/dummy-user-service.service";
import {AlertService} from "./services/alert.service";
import {MessageService} from "./services/message.service";
import {AlertComponent} from "./alert/alert.component";
import {MessageComponent} from "./message/message.component";
import {DisplayUserComponent} from "./display-user/display-user.component";
import {USER_SERVICE} from "./services/user.service";

@NgModule({
  imports: [
    HttpModule,
    CommonModule
  ],
  declarations: [
    AlertComponent,
    MessageComponent,
    DisplayUserComponent
  ],
  exports: [
    AlertComponent,
    MessageComponent,
    DisplayUserComponent
  ],
  providers: [
    { provide: DRAWING_SERVICE, useClass: ApiDrawingService },
    { provide: LOGGED_IN_USER_SERVICE, useClass: DummyUserService },
    { provide: USER_SERVICE, useClass: DummyUserService },
    AlertService,
    MessageService
  ]
})
export class SharedModule { }
