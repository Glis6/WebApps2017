import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DRAWING_SERVICE} from "./services/canvas.service";
import {ApiDrawingService} from "./services/api/api-drawing.service";
import {HttpModule} from "@angular/http";
import {LOGGED_IN_USER_SERVICE} from "./services/logged-in-user.service";
import {DummyLoggedInUserService} from "./services/dummy/dummy-logged-in-user.service";

@NgModule({
  imports: [
    HttpModule,
    CommonModule
  ],
  providers: [
    { provide: DRAWING_SERVICE, useClass: ApiDrawingService },
    { provide: LOGGED_IN_USER_SERVICE, useClass: DummyLoggedInUserService }
  ]
})
export class SharedModule { }
