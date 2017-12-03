import {LoggedInUserService} from "../logged-in-user.service";
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user.class";
import 'rxjs/add/observable/of';
import {UserService} from "../user.service";

export class DummyUserService implements LoggedInUserService, UserService {
  private _user: Observable<User> = Observable.of(User.fromJSON({
    name: {firstName: 'Gilles', lastName: 'Vercammen'},
    _id: 1
  }));

  get user(): Observable<User> {
    return this._user;
  }

  getUser(id: string): Observable<User> {
    return this._user;
  }
}
