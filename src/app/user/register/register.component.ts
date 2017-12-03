import {AUTHENTICATION_SERVICE, AuthenticationService} from '../../shared/services/authentication.service';
import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailAddressAvailableValidator} from "../../shared/validators/email-address-available-validator";
import {MessageService} from "../../shared/services/message.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  /**
   * The form to display.
   */
  public form: FormGroup;

  constructor(@Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService) {
  }

  /**
   * Creates the form.
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      emailAddress: ['', [Validators.required, Validators.minLength(4), EmailAddressAvailableValidator.create]],
      password: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(40)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]]
    });
  }

  /**
   *
   */
  onSubmit() {
    if (this.form.valid) {
      this.messageService.info('Attempting to register you...');
      this.authenticationService.register(
        this.form.get('emailAddress').value,
        this.form.get('password').value,
        this.form.get('firstName').value,
        this.form.get('lastName').value
      ).subscribe(result => {
        if (result) {
          this.router.navigate(['/home']);
        }
      });
    }
  }
}

