import {InjectionToken} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user.class";

/**
 * An injection token for the {@link DrawingService}.
 */
export const USER_SERVICE = new InjectionToken<UserService>('user.service');

export interface UserService {
  getUser(id: string): Observable<User>;
}
