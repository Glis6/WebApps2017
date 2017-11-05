import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {LOGIN_SERVICE, LoginService} from "../shared/services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from "firebase";
import AuthProvider = firebase.auth.AuthProvider;
/**
 * @type {firebase.auth.GoogleAuthProvider} The authentication provider for Google.
 */
const GOOGLE_API = new firebase.auth.GoogleAuthProvider();

/**
 * @type {firebase.auth.FacebookAuthProvider} The authentication provider for Facebook.
 */
const FACEBOOK_API = new firebase.auth.FacebookAuthProvider();

/**
 * @type {firebase.auth.TwitterAuthProvider} The authentication provider for Twitter.
 */
const TWITTER_API = new firebase.auth.TwitterAuthProvider();

/**
 * @type {firebase.auth.GithubAuthProvider} The authentication provider for Github.
 */
const GITHUB_API = new firebase.auth.GithubAuthProvider();


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * @type {LoginForm} The object that is being transformed.
   */
  model: LoginForm = new LoginForm();

  /**
   * The message to display on the front page to show feedback.
   */
  private message: string = 'Please log in using any of the following methods.';

  /**
   * A link to the form to be able to check validation.
   */
  @ViewChild('loginForm')
  private form: any;

  /**
   * The url to return to when logged in.
   */
  @Input()
  private returnUrl: string;

  /**
   * @param {LoginService} loginProvider The loginProvider to use when trying to log in a user.
   * @param {Router} router The router to use to route to the login page.
   * @param {ActivatedRoute} route The route used to get here.
   */
  constructor(@Inject(LOGIN_SERVICE) private loginProvider: LoginService, private router: Router, private route: ActivatedRoute) {
  }

  /**
   * Initializes the route parameters
   */
  ngOnInit() {
    const returnUrl = this.route.snapshot.queryParams['returnUrl'];
    if (returnUrl)
      this.returnUrl = returnUrl;
  }

  /**
   * Open the Google API to attempt to log in.
   */
  loginGoogle() {
    this.loginWithApi(GOOGLE_API);
  }

  /**
   * Open the Facebook API to attempt to log in.
   */
  loginFacebook() {
    this.loginWithApi(FACEBOOK_API);
  }

  /**
   * Open the Twitter API to attempt to log in.
   */
  loginTwitter() {
    this.loginWithApi(TWITTER_API);
  }

  /**
   * Open the Github API to attempt to log in.
   */
  loginGithub() {
    this.loginWithApi(GITHUB_API);
  }

  /**
   * Attempts to log the user in with the given information.
   */
  login() {
    if (this.form.valid) {
      this.message = "Attempting to log in...";
      this.loginProvider
        .customLogin(this.model)
        .then(result => this.postLogin(result))
        .catch(reason => this.onException(reason, 'this form'));
    }
  }

  /**
   * Attempts to log in with the given API.
   *
   * @param {AuthProvider} authProvider The API to attempt to log in with.
   */
  private loginWithApi(authProvider: AuthProvider) {
    this.loginProvider
      .loginWithApi(authProvider)
      .then(result => this.postLogin(result))
      .catch(reason => this.onException(reason, authProvider.toString()));
  }

  /**
   * @param result The result from logging in.
   */
  private postLogin(result) {
    this.message = "Redirecting you...";
    this.router.navigateByUrl(this.returnUrl ? this.returnUrl : '/home');
  }

  /**
   * @param reason The reason the error occurred
   * @param authProviderName The name of the authentication provider used.
   */
  private onException(reason, authProviderName) {
    if (reason.code === 'auth/operation-not-allowed') {
      this.message = 'Logging in using ' + authProviderName + ' is not available right now.';
    } else {
      this.message = reason.message;
    }
  }
}

/**
 * A small helper class that holds form data.
 */
export class LoginForm {
  /**
   * @param {string} emailAddress The e-mail address for the user.
   * @param {string} password The password for the user.
   */
  constructor(public emailAddress: string = '',
              public password: string = '') {
  }
}
