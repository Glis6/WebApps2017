import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {AngularFireModule} from "angularfire2";
import {AngularFireAuthModule} from "angularfire2/auth";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {environment} from "../environments/environment";

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {AuthenticationService} from "./shared/services/authentication.service";
import {UserDatabaseService} from "./shared/services/database/user-database.service";
import {LOGIN_SERVICE} from "./shared/services/login.service";
import {REGISTRATION_SERVICE} from "./shared/services/registration.service";
import {LOGGED_IN_USER_PROVIDER} from "./shared/services/user-provider.service";
import {USER_SERVICE} from "./shared/services/user.service";
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {CLASS_SERVICE} from "./shared/services/class.service";
import {LocalClassService} from "./shared/services/local-class.service";

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
    component: RegistrationComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    UserProfileComponent
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
    {provide: LOGIN_SERVICE, useClass: AuthenticationService},
    {provide: REGISTRATION_SERVICE, useClass: AuthenticationService},
    {provide: LOGGED_IN_USER_PROVIDER, useClass: AuthenticationService},
    {provide: USER_SERVICE, useClass: UserDatabaseService},
    {provide: CLASS_SERVICE, useClass: LocalClassService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
