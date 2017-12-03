import {Component, Inject, Input, OnInit} from '@angular/core';
import {USER_SERVICE, UserService} from "../services/user.service";
import {User} from "../models/user.class";

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css']
})
export class DisplayUserComponent implements OnInit {
  /**
   * The userId to look for.
   */
  @Input()
  public userId: string;

  /**
   * The user that has been loaded.
   */
  public user: User;

  /**
   * The userService to look for the user.
   */
  constructor(@Inject(USER_SERVICE) private userService: UserService) {
  }

  /**
   * Links the user to the userId.
   */
  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(user => this.user = user);
  }
}
