import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {HomeComponent} from './public/home/home.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {SharedModule} from "./shared/shared.module";
import {PublicModule} from "./public/public.module";
import {BrowserModule} from "@angular/platform-browser";

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
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PublicModule,
    // Keep this one last
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
