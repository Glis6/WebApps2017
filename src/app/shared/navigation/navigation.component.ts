import {Component, Inject, OnInit} from '@angular/core';
import {LOGGED_IN_USER_PROVIDER, LoggedInUserProvider} from "../services/user-provider.service";
import {User} from "../models/user.interface";
import {LOGIN_SERVICE, LoginService} from "../services/login.service";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  /**
   * The currently logged in user.
   */
  private user: User;

  /**
   * @param {LoginService} loginService The loginService to use.
   * @param {LoggedInUserProvider} userProvider The userProvider to use.
   */
  constructor(@Inject(LOGIN_SERVICE) private loginService: LoginService, @Inject(LOGGED_IN_USER_PROVIDER) private userProvider: LoggedInUserProvider) {
  }

  /**
   * Links the user.
   */
  ngOnInit() {
    this.userProvider.user.subscribe(user => this.user = user);
  }

  /**
   * Logs the user out.
   */
  onLogout() {
    this.loginService.logout();
  }
}
