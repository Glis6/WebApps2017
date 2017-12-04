import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home/home.component";
import {ViewDrawingComponent} from "./view-drawing/view-drawing.component";
import {RatingComponent} from "./rating/rating.component";
import {CommentComponent} from "./write-comment/write-comment.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    ViewDrawingComponent,
    RatingComponent,
    CommentComponent
  ]
})
export class PublicModule { }
