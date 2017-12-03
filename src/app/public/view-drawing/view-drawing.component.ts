import {Component, Inject, Input, OnInit} from '@angular/core';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Drawing} from "../../shared/models/drawing.class";
import {User} from "../../shared/models/user.class";
import {LOGGED_IN_USER_SERVICE, LoggedInUserService} from "../../shared/services/logged-in-user.service";
import {Vote} from "../../shared/models/vote.class";
import {Comment} from "../../shared/models/comment.class";

@Component({
  selector: 'app-view-drawing',
  templateUrl: './view-drawing.component.html',
  styleUrls: ['./view-drawing.component.css']
})
export class ViewDrawingComponent implements OnInit {
  /**
   * The drawing to display.
   */
  @Input()
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
    if(!this.drawing) {
      this.route.queryParams.subscribe((params: ParamMap) => this.drawingService
        .getDrawing(params.get('drawingId'))
        .subscribe(drawing => this.drawing = drawing));
    }
  }

  addDrawingUpVote(drawing: Drawing) {
    if(!this.user)
      return;
    if(drawing.hasUpVoted(this.user.id))
      return;
    if(drawing.hasDownVoted(this.user.id)) {
      this.drawingService.removeDownVote(drawing, this.user.id).subscribe(() => {});
    }
    this.drawingService.addUpVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {});
  }

  addDrawingDownVote(drawing: Drawing) {
    if(!this.user)
      return;
    if(drawing.hasDownVoted(this.user.id))
      return;
    if(drawing.hasUpVoted(this.user.id)) {
      this.drawingService.removeUpVote(drawing, this.user.id).subscribe(() => {});
    }
    this.drawingService.addDownVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {});
  }

  addCommentUpVote(drawing: Drawing, comment: Comment) {
    if(!this.user)
      return;
    if(comment.hasUpVoted(this.user.id))
      return;
    if(comment.hasDownVoted(this.user.id)) {
      this.drawingService.removeCommentDownVote(drawing, comment, this.user.id).subscribe(() => {});
    }
    this.drawingService.addCommentUpVote(drawing, comment, new Vote(this.user.id, new Date)).subscribe(() => {});
  }

  addCommentDownVote(drawing: Drawing, comment: Comment) {
    if(!this.user)
      return;
    if(comment.hasDownVoted(this.user.id))
      return;
    if(comment.hasUpVoted(this.user.id)) {
      this.drawingService.removeCommentUpVote(drawing, comment, this.user.id).subscribe(() => {});
    }
    this.drawingService.addCommentDownVote(drawing, comment, new Vote(this.user.id, new Date)).subscribe(() => {});
  }

  addComment(commentInput: string) {
    if(!this.user)
      return;
    this.drawingService.addComment(this.drawing, new Comment(this.user.id, commentInput)).subscribe(() => {});
  }
}
