import {InjectionToken} from '@angular/core';
import {User} from "../models/user.interface";

/**
 * An injection token for the {@link RegistrationService}.
 */
export const REGISTRATION_SERVICE = new InjectionToken<RegistrationService>('registration.service');

/**
 * An interface that provides the ability to register.
 */
export interface RegistrationService {
  /**
   * Attempts to register a user to the system.
   * @param {string} emailAddress The e-mail address to register the user to.
   * @param {string} password The password that the user wants to use.
   * @param displayName The name displayed for the user.
   */
  registerUser(emailAddress: string,
               password: string,
               displayName: string): Promise<User>;
}
