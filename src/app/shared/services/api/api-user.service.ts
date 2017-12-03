import {Injectable} from "@angular/core";
import {UserService} from "../user.service";
import {Observable} from "rxjs/Observable";
import {Http} from "@angular/http";
import {User} from "../../models/user.class";

@Injectable()
export class ApiUserService implements UserService {
  /**
   * The URL to connect to.
   */
  private _url = '/API/user';

  /**
   * @param {Http} http The HTTP to use to connect to.
   */
  constructor(private http: Http) {
  }

  getUser(id: string): Observable<User> {
    console.log('Id: ' + id);
    return this.http.get(`${this._url}/${id}`)
      .map(res => res.json())
      .map(res => {
        return User.fromJSON(res)
      });
  }
}
