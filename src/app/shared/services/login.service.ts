import {InjectionToken} from '@angular/core';
import {AuthProvider} from 'firebase/auth';

/**
 * An injection token for the {@link LoginService}.
 */
export const LOGIN_SERVICE = new InjectionToken<LoginService>('login.service');

/**
 * An interface that provides the ability to log in.
 */
export interface LoginService {
  /**
   * Logs the user in using an external API.
   *
   * @param {AuthProvider} provider The provider to use to log in to.
   */
  loginWithApi(provider: AuthProvider): Promise<void>;

  /**
   * Logs the user in with a custom login function.
   *
   * @param loginInformation The e-mail address and password of the user.
   */
  customLogin(loginInformation: {
    emailAddress: string;
    password: string;
  }): Promise<void>;

  /**
   * Logs the user out from the system.
   */
  logout(): Promise<any>;
}
