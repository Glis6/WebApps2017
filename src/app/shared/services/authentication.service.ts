import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import {Injectable, InjectionToken} from '@angular/core';
import 'rxjs/add/operator/map';
import {User} from "../models/user.class";

/**
 * An injection token for the {@link AuthenticationService}.
 */
export const AUTHENTICATION_SERVICE = new InjectionToken<AuthenticationService>('authentication.service');

export interface AuthenticationService {
  /**
   * The currently logged in user.
   */
  user: Observable<User>;

  /**
   * The token for the currently logged in user.
   */
  token: string;

  /**
   * Attempts to log the user in.
   *
   * @param {string} emailAddress The username to login with.
   * @param {string} password The password to authenticate with.
   */
  login(emailAddress: string, password: string): Observable<boolean>;

  /**
   * Logs the user off.
   */
  logout();

  /**
   * Registers the user.
   *
   * @param {string} emailAddress The e-mail address to register.
   * @param {string} password The password to authenticate with.
   * @param {string} firstName The first name of the user.
   * @param {string} lastName The last name of the user.
   */
  register(emailAddress: string, password: string, firstName: string, lastName: string): Observable<boolean>;

  /**
   * Checks if the given e-mail address is still available.
   *
   * @param {string} emailAddress The e-mail address to check.
   */
  emailAddressAvailable(emailAddress: string): Observable<boolean>;
}
