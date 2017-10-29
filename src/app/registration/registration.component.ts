import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {REGISTRATION_SERVICE, RegistrationService} from "../shared/services/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  /**
   * @type {RegistrationForm} The object that is being transformed.
   */
  private model: RegistrationForm = new RegistrationForm();

  /**
   * A message displaying what is happening.
   */
  private message: string;

  /**
   * A link to the form to be able to check validation.
   */
  @ViewChild('signUpForm')
  private form: any;

  /**
   * @param {RegistrationService} registrationService The registrationService to use.
   * @param router The router to use.
   */
  constructor(@Inject(REGISTRATION_SERVICE) private registrationService: RegistrationService, private router: Router) {
  }

  /**
   * Checks whether or not the form is filled in correct and then registers the user.
   */
  register() {
    if (this.form.valid) {
      this.registrationService
        .registerUser(this.model.emailAddress, this.model.password, this.model.displayName)
        .then(value => {
          this.message = 'Successfully registered, redirecting...';
          this.router.navigateByUrl('/home');
        })
        .catch(reason => {
          this.message = reason.message;
        });
    }
  }
}

/**
 * A small helper class that holds form data.
 */
class RegistrationForm {
  /**
   * @param {string} emailAddress The e-mail address for the user.
   * @param {string} password The password for the user.
   * @param displayName The display name of the user.
   */
  constructor(public emailAddress: string = '',
              public password: string = '',
              public displayName: string = '') {
  }
}
