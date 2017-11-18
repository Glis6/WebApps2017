import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.class";

/**
 * An injection token for the {@link DrawingService}.
 */
export const LOGGED_IN_USER_SERVICE = new InjectionToken<LoggedInUserService>('logged-in-user.service');

export interface LoggedInUserService {
  user: Observable<User>;
}
