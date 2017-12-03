import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {HomeComponent} from './public/home/home.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {SharedModule} from "./shared/shared.module";
import {PublicModule} from "./public/public.module";
import {BrowserModule} from "@angular/platform-browser";
import {UserModule} from "./user/user.module";
import {LoginComponent} from "./user/login/login.component";
import {RegisterComponent} from "./user/register/register.component";

export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
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
    UserModule,
    // Keep this one last
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
