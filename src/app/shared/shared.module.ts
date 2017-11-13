import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DRAWING_SERVICE} from "./services/canvas.service";
import {ApiDrawingService} from "./services/api/api-drawing.service";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [
    HttpModule,
    CommonModule
  ],
  providers: [
    { provide: DRAWING_SERVICE, useClass: ApiDrawingService }
  ]
})
export class SharedModule { }
