import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CanvasComponent} from "./canvas/canvas.component";
import {ColorPickerComponent} from "./canvas/color-picker.component";
import {WidthPickerComponent} from "./canvas/width-picker.component";
import { PortfolioComponent } from './portfolio/portfolio.component';
import {SharedModule} from "../shared/shared.module";
import { EditDrawingComponent } from './edit-drawing/edit-drawing.component';
import { CreateDrawingComponent } from './create-drawing/create-drawing.component';
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    CanvasComponent,
    ColorPickerComponent,
    WidthPickerComponent,
    PortfolioComponent,
    EditDrawingComponent,
    CreateDrawingComponent
  ]
})
export class DrawingModule { }
