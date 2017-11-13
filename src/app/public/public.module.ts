import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WidthPickerComponent} from "./canvas/width-picker.component";
import {CanvasComponent} from "./canvas/canvas.component";
import {ColorPickerComponent} from "./canvas/color-picker.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home/home.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CanvasComponent,
    ColorPickerComponent,
    WidthPickerComponent,
    HomeComponent
  ]
})
export class PublicModule { }
