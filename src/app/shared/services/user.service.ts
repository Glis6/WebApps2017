import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.class";

/**
 * An injection token for the {@link UserService}.
 */
export const USER_SERVICE = new InjectionToken<UserService>('user.service');

export interface UserService {
  /**
   * Gets a user by the id.
   *
   * @param {string} id The ID to look for.
   */
  getUser(id: string): Observable<User>;
}
