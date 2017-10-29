import {Inject, Injectable, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {USER_SERVICE, UserService} from "./user.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.interface";
import * as firebase from "firebase";
import AuthProvider = firebase.auth.AuthProvider;
import {AngularFireAuth} from "angularfire2/auth";
import {LoggedInUserProvider} from "./user-provider.service";
import {RegistrationService} from "./registration.service";

@Injectable()
export class AuthenticationService implements LoginService, RegistrationService, LoggedInUserProvider {
  /**
   * The currently logged in user.
   */
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  /**
   * @param {AngularFireAuth} authentication The authentication object to use.
   * @param {UserService} userService The userService to use when registering the user.
   */
  constructor(private authentication: AngularFireAuth, @Inject(USER_SERVICE) private userService: UserService) {
    this.authentication
      .authState
      .switchMap(authState => authState ? this.userService.getSingle(authState.uid) : Observable.of(null))
      .subscribe(user => this.user.next(user));
  }

  /**
   * @returns {BehaviorSubject<User>} The currently logged in user.
   */
  get user(): BehaviorSubject<User> {
    return this._user;
  }

  loginWithApi(provider: AuthProvider): Promise<void> {
    return this.authentication
      .auth
      .signInWithPopup(provider)
      .then(result => {});
  }

  customLogin(loginInformation: { emailAddress: string; password: string; }): Promise<void> {
    return this.authentication
      .auth
      .signInWithEmailAndPassword(loginInformation.emailAddress, loginInformation.password)
      .then(result => {});
  }

  registerUser(emailAddress: string, password: string, displayName: string): Promise<User> {
    return this.authentication
      .auth
      .createUserWithEmailAndPassword(emailAddress, password)
      .then(result => this.userService.create({
        id: result.uid,
        emailAddress: emailAddress,
        displayName: displayName,
        characters: []
      }));
  }

  logout(): Promise<any> {
    return this.authentication
      .auth
      .signOut();
  }
}
