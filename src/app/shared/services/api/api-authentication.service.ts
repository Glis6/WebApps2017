import {Inject, Injectable} from "@angular/core";
import {AuthenticationService} from "../authentication.service";
import {Observable} from "rxjs/Observable";
import {User} from "../../models/user.class";
import {Http} from "@angular/http";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {USER_SERVICE, UserService} from "../user.service";

@Injectable()
export class ApiAuthenticationService implements AuthenticationService {
  /**
   * The URL to connect to.
   */
  private _url = '/API/user';

  /**
   * The currently logged in user.
   */
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  /**
   * @param {Http} http The HTTP to make the API calls with.
   * @param userService The userService to use.
   */
  constructor(private http: Http,
              @Inject(USER_SERVICE) private userService: UserService) {
    if(localStorage.getItem('user')) {
      const user = JSON.parse(localStorage.getItem('user'));
      if(user._id) {
        this.userService.getUser(user._id).subscribe(user => this._user.next(user));
      } else {
        localStorage.removeItem('user');
      }
    }
  }

  /**
   * @returns {Observable<User>} The currently logged in user.
   */
  get user(): Observable<User> {
    return this._user.asObservable();
  }

  /**
   * @returns {string} The token for the currently logged in user.
   */
  get token(): string {
    return JSON.parse(localStorage.getItem('user')).token;
  }

  login(emailAddress: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, {emailAddress: emailAddress, password: password})
      .map(res => res.json())
      .map(res => {
        const token = res.token;
        const user: User = User.fromJSON(res.user);
        if (token && user) {
          localStorage.setItem('user', JSON.stringify({_id: user.id, token: token}));
          this._user.next(user);
          return true;
        } else {
          return false;
        }
      });
  }

  logout() {
    if (this._user.getValue()) {
      localStorage.removeItem('user');
      this._user.next(null);
    }
  }

  register(emailAddress: string, password: string, name: string): Observable<boolean> {
    return this.http.post(`${this._url}/register`, {
      emailAddress: emailAddress,
      password: password,
      name: name
    }).map(res => res.json())
      .map(res => {
        const token = res.token;
        const user: User = User.fromJSON(res.user);
        if (token && user) {
          localStorage.setItem('user', JSON.stringify({_id: user.id, token: token}));
          this._user.next(user);
          return true;
        } else {
          return false;
        }
      });
  }

  emailAddressAvailable(emailAddress: string): Observable<boolean> {
    return this.http.post(`${this._url}/emailaddresstaken`, {emailAddress: emailAddress})
      .map(res => res.json())
      .map(item => item.username !== 'taken');
  }
}
