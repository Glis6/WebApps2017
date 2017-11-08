import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {environment} from "../environments/environment";

import {AppComponent} from './app.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import {CanvasComponent} from "./canvas/canvas.component";
import {ColorPickerComponent} from "./canvas/color-picker.component";
import {WidthPickerComponent} from "./canvas/width-picker.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    CanvasComponent,
    ColorPickerComponent,
    WidthPickerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    // Keep this one last
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
