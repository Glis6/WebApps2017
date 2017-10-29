import {InjectionToken} from "@angular/core";
import {GenericObjectService} from "./generic-object-service";
import {User} from "../models/user.interface";

/**
 * An injection token for the {@link UserService}.
 */
export const USER_SERVICE = new InjectionToken<UserService>('user.service');

/**
 * An interface that controls all the data handling to do with users.
 */
export interface UserService extends GenericObjectService<User, string> {
}
