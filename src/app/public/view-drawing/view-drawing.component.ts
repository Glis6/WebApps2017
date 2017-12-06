import {Component, Inject, Input, OnInit} from '@angular/core';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Drawing} from "../../shared/models/drawing.class";
import {User} from "../../shared/models/user.class";
import {Vote} from "../../shared/models/vote.class";
import {Comment} from "../../shared/models/comment.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../../shared/services/authentication.service";
import {Subscription} from "rxjs/Subscription";

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

  /**
   * Whether or not we're currently processing.
   */
  private _processing: boolean = false;

  constructor(@Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              @Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
  }

  /**
   * Links the drawing.
   */
  ngOnInit() {
    this.authenticationService.user.subscribe(user => this.user = user);
    if (!this.drawing) {
      this.route.queryParams.subscribe((params: ParamMap) => this.drawingService
        .getDrawing(params.get('drawingId'))
        .subscribe(drawing => this.drawing = drawing));
    }
  }

  addDrawingUpVote(drawing: Drawing) {
    if (!this.user || this._processing)
      return;
    if (drawing.hasUpVoted(this.user.id))
      return;
    this._processing = true;
    if (drawing.hasDownVoted(this.user.id)) {
      const subscription: Subscription = this.drawingService.removeDownVote(drawing, this.user.id).subscribe(() => {
        subscription.unsubscribe();
        const secondSub: Subscription = this.drawingService.addUpVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {
          secondSub.unsubscribe();
          this._processing = false;
        });
      });
    } else {
      const subscription: Subscription = this.drawingService.addUpVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {
        this._processing = false;
        subscription.unsubscribe();
      });
    }
  }

  addDrawingDownVote(drawing: Drawing) {
    if (!this.user || this._processing)
      return;
    if (drawing.hasDownVoted(this.user.id))
      return;
    this._processing = true;
    if (drawing.hasUpVoted(this.user.id)) {
      const subscription: Subscription = this.drawingService.removeUpVote(drawing, this.user.id).subscribe(() => {
        subscription.unsubscribe();
        const secondSub: Subscription = this.drawingService.addDownVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {
          secondSub.unsubscribe();
          this._processing = false;
        });
      });
    } else {
      const subscription: Subscription = this.drawingService.addDownVote(drawing, new Vote(this.user.id, new Date)).subscribe(() => {
        this._processing = false;
        subscription.unsubscribe();
      });
    }
  }

  addCommentUpVote(drawing: Drawing, comment: Comment) {
    if (!this.user || this._processing)
      return;
    if (comment.hasUpVoted(this.user.id))
      return;
    this._processing = true;
    if (comment.hasDownVoted(this.user.id)) {
      const subscription: Subscription = this.drawingService.removeCommentDownVote(drawing, comment, this.user.id).subscribe(() => {
        subscription.unsubscribe();
        const secondSub: Subscription = this.drawingService.addCommentUpVote(drawing, comment, new Vote(this.user.id, new Date)).subscribe(() => {
          secondSub.unsubscribe();
          this._processing = false;
        });
      });

    } else {
      const subscription: Subscription = this.drawingService.addCommentUpVote(drawing, comment, new Vote(this.user.id, new Date)).subscribe(() => {
        this._processing = false;
        subscription.unsubscribe();
      });
    }
  }

  addCommentDownVote(drawing: Drawing, comment: Comment) {
    if (!this.user || this._processing)
      return;
    if (comment.hasDownVoted(this.user.id))
      return;
    this._processing = true;
    if (comment.hasUpVoted(this.user.id)) {
      const subscription: Subscription = this.drawingService.removeCommentUpVote(drawing, comment, this.user.id).subscribe(() => {
        const secondSub: Subscription = this.drawingService.addCommentDownVote(drawing, comment, new Vote(this.user.id, new Date)).subscribe(() => {
          secondSub.unsubscribe();
          this._processing = false;
        });
      });

    } else {
      const subscription: Subscription = this.drawingService.addCommentDownVote(drawing, comment, new Vote(this.user.id, new Date)).subscribe(() => {
        this._processing = false;
        subscription.unsubscribe();
      });
    }
  }

  addComment(commentInput: string) {
    if (!this.user || this._processing)
      return;
    this._processing = true;
    const subscription: Subscription = this.drawingService.addComment(this.drawing, new Comment(this.user.id, commentInput)).subscribe(() => {
      this._processing = false;
      subscription.unsubscribe();
    });
  }
}
