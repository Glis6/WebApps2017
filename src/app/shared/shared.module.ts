import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DRAWING_SERVICE} from "./services/drawing.service";
import {ApiDrawingService} from "./services/api/api-drawing.service";
import {HttpModule} from "@angular/http";
import {AlertService} from "./services/alert.service";
import {MessageService} from "./services/message.service";
import {AlertComponent} from "./alert/alert.component";
import {MessageComponent} from "./message/message.component";
import {DisplayUserComponent} from "./display-user/display-user.component";
import {USER_SERVICE} from "./services/user.service";
import {ApiAuthenticationService} from "./services/api/api-authentication.service";
import {AUTHENTICATION_SERVICE} from "./services/authentication.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ApiUserService} from "./services/api/api-user.service";

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AlertComponent,
    MessageComponent,
    DisplayUserComponent
  ],
  exports: [
    AlertComponent,
    MessageComponent,
    DisplayUserComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: DRAWING_SERVICE, useClass: ApiDrawingService },
    { provide: AUTHENTICATION_SERVICE, useClass: ApiAuthenticationService },
    { provide: USER_SERVICE, useClass: ApiUserService },
    AlertService,
    MessageService
  ]
})
export class SharedModule { }
