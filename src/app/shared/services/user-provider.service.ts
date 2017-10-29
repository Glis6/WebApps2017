import {InjectionToken} from '@angular/core';
import {AuthProvider} from 'firebase/auth';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {User} from "../models/user.interface";

/**
 * An injection token for the {@link LoginService}.
 */
export const LOGGED_IN_USER_PROVIDER = new InjectionToken<LoggedInUserProvider>('logged_in_user.provider');

/**
 * An interface that provides a user.
 */
export interface LoggedInUserProvider {
  /**
   * The user that is currently logged in.
   */
  user: BehaviorSubject<User>;
}
