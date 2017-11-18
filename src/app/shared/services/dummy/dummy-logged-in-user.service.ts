import {LoggedInUserService} from "../logged-in-user.service";
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user.class";
import {Subject} from "rxjs/Subject";
import {OnInit} from "@angular/core";
import 'rxjs/add/observable/of';

export class DummyLoggedInUserService implements LoggedInUserService {
  private _user: Observable<User> = Observable.of(User.fromJSON({
    name: {firstName: 'Gilles', lastName: 'Vercammen'},
    _id: 1
  }));

  get user(): Observable<User> {
    return this._user;
  }
}
