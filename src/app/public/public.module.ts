import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidthPickerComponent} from "./canvas/width-picker.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ColorPickerComponent} from "./canvas/color-picker.component";
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
    CanvasComponent,
    ColorPickerComponent,
    WidthPickerComponent,
    HomeComponent,
    ViewDrawingComponent,
    RatingComponent,
    CommentComponent
  ]
})
export class PublicModule { }
