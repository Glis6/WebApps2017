import {AuthenticationService} from "../services/authentication.service";
import {AbstractControl} from "@angular/forms";

export class EmailAddressAvailableValidator {
  /**
   * Creates a new validator to check if the e-mail address is available.
   *
   * @param {AuthenticationService} authenticationService The authenticationService that will perform the check.
   */
  static create(authenticationService: AuthenticationService) {
    return (control: AbstractControl) => {
      return authenticationService.emailAddressAvailable(control.value).map(available => {
        if (available) {
          return null;
        }
        return {
          emailTaken: true
        };
      })
    };
  }
}
