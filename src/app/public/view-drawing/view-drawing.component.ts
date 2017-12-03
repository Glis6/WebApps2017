import {Component, Inject, OnInit} from '@angular/core';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/canvas.service";
import {ActivatedRoute} from "@angular/router";
import {Drawing} from "../../shared/models/drawing.class";
import {User} from "../../shared/models/user.class";
import {LOGGED_IN_USER_SERVICE, LoggedInUserService} from "../../shared/services/logged-in-user.service";
import {Vote} from "../../shared/models/vote.class";

@Component({
  selector: 'app-view-drawing',
  templateUrl: './view-drawing.component.html',
  styleUrls: ['./view-drawing.component.css']
})
export class ViewDrawingComponent implements OnInit {
  /**
   * The drawing to display.
   */
  public drawing: Drawing;

  /**
   * The currently logged in user.
   */
  public user: User;

  constructor(@Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              @Inject(LOGGED_IN_USER_SERVICE) private userProvider: LoggedInUserService,
              private route: ActivatedRoute) {
  }

  /**
   * Links the drawing.
   */
  ngOnInit() {
    this.userProvider.user.subscribe(user => this.user = user);
    this.route.queryParams.subscribe(params => this.drawingService
        .getDrawing(params.get('drawingId'))
        .subscribe(drawing => this.drawing = drawing));
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
