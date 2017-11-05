import {InjectionToken} from "@angular/core";
import {GenericObjectService} from "./generic-object-service";
import {Class} from "../models/class.interface";

/**
 * An injection token for the {@link ClassService}.
 */
export const CLASS_SERVICE = new InjectionToken<ClassService>('class.service');

/**
 * An interface that controls all the data handling to do with users.
 */
export interface ClassService extends GenericObjectService<Class, string> {
}
