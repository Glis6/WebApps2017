import {Component, Inject, OnInit} from '@angular/core';
import {LOGGED_IN_USER_PROVIDER, LoggedInUserProvider} from "../shared/services/user-provider.service";
import {User} from "../shared/models/user.interface";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  /**
   * The current user.
   */
  user: User;

  constructor(@Inject(LOGGED_IN_USER_PROVIDER) private userProvider: LoggedInUserProvider) {
  }

  /**
   * Links the user to the logged in user.
   */
  ngOnInit() {
    this.userProvider.user.subscribe(user => this.user = user);
  }
}
