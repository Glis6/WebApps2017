import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../models/user.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  /**
   * The currently logged in user.
   */
  public user: User;

  /**
   * @param authenticationService The authenticationService to use.
   */
  constructor(@Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService) {
  }

  /**
   * Links the currently logged in user to the loggedInUserService.
   */
  ngOnInit() {
    this.authenticationService.user.subscribe(user => {
      this.user = user;
      console.log('Set new user as ' + user && user != null ? user.toJSON() : 'null');
    });
  }

  logout() {
    this.authenticationService.logout();
    console.log("Logged out");
  }
}
