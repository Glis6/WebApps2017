import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Drawing} from "../../shared/models/drawing.class";
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {User} from "../../shared/models/user.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../../shared/services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  /**
   * All drawings to display on the home page.
   */
  public drawings: Observable<Drawing[]>;

  /**
   * The currently logged in user.
   */
  public user: User;

  constructor(@Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              @Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.drawings = this.drawingService.getAll();
    this.authenticationService.user.subscribe(user => this.user = user);
  }
}
