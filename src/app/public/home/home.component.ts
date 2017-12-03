import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Drawing} from "../../shared/models/drawing.class";
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {Vote} from "../../shared/models/vote.class";
import {LOGGED_IN_USER_SERVICE, LoggedInUserService} from "../../shared/services/logged-in-user.service";
import {User} from "../../shared/models/user.class";

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
              @Inject(LOGGED_IN_USER_SERVICE) private loggedInUserService: LoggedInUserService) {
  }

  ngOnInit() {
    this.drawings = this.drawingService.getAll();
    this.loggedInUserService.user.subscribe(user => this.user = user);
  }

  addUpVote(drawing: Drawing) {
    if(!this.user)
      return;
    if(drawing.hasUpVoted(this.user.id))
      return;
    if(drawing.hasDownVoted(this.user.id)) {
      this.drawingService.removeDownVote(drawing, this.user.id).subscribe(() => {});
    }
    this.drawingService.addUpVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {});
  }

  addDownVote(drawing: Drawing) {
    if(!this.user)
      return;
    if(drawing.hasDownVoted(this.user.id))
      return;
    if(drawing.hasUpVoted(this.user.id)) {
      this.drawingService.removeUpVote(drawing, this.user.id).subscribe(() => {});
    }
    this.drawingService.addDownVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {});
  }
}
