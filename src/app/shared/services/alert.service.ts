import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Subject} from 'rxjs/Subject';
import {Alert, AlertOption} from "../models/alert.interface";

@Injectable()
export class AlertService {
  /**
   * The current alert.
   */
  private _alert = new Subject<Alert>();

  /**
   * Creates a new confirmation.
   *
   * @param {string} message The message to display on the confirmation.
   * @param options The options for this alert.
   */
  confirmation(message: string, ...options: AlertOption[]) {
    this.setAlert(message, options);
  }

  /**
   * Creates the alert from the parameters and sets it.
   *
   * @param {string} message The message to display on the alert.
   * @param options The options for this alert.
   */
  private setAlert(message: string, options: AlertOption[]) {
    this._alert.next({
      message: message,
      options: options.map(option => {
        const oldCallback: (() => void) = option.onClick;
        option.onClick = () => {
          this._alert.next();
          oldCallback();
        };
        return option;
      })
    });
  }

  /**
   * @returns {Observable<Alert>} The alert.
   */
  get alert(): Observable<Alert> {
    return this._alert;
  }
}
