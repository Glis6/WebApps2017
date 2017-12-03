import {AUTHENTICATION_SERVICE, AuthenticationService} from '../../shared/services/authentication.service';
import {Component, Inject, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import {MessageService} from "../../shared/services/message.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * The form that gets filled in when attempting to log in.
   */
  public form: FormGroup;

  /**
   * @param {AuthenticationService} authService The authenticationService to use to log in to.
   * @param {Router} router The router to link to other pages.
   * @param {FormBuilder} formBuilder The formBuilder to use to create the login form.
   * @param {MessageService} messageService The messageService to use to show messages.
   */
  constructor(@Inject(AUTHENTICATION_SERVICE) private authService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private messageService: MessageService) { }

  /**
   * Creates the login form.
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      emailAddress: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Submits the login form ant attempts to log in.
   */
  onSubmit() {
    if(this.form.valid) {
      this.messageService.info('Attempting to log in...');
      this.authService.login(this.form.get('emailAddress').value, this.form.get('password').value).subscribe(result => {
        if (result) {
          this.router.navigateByUrl('/home');
        }
      }, err => this.messageService.error(err.json().message));
    }
  }
}
