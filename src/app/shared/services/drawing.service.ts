import {InjectionToken} from "@angular/core";
import {Drawing} from "../models/drawing.class";
import {Observable} from "rxjs/Observable";
import {Vote} from "../models/vote.class";
import {Comment} from "../models/comment.class";

/**
 * An injection token for the {@link DrawingService}.
 */
export const DRAWING_SERVICE = new InjectionToken<DrawingService>('drawing.service');

export interface DrawingService {
  getAll(): Observable<Drawing[]>;

  getDrawing(id: string): Observable<Drawing>;

  createDrawing(drawing: Drawing): Observable<Drawing>;

  addUpVote(drawing: Drawing, vote: Vote): Observable<Vote>;

  addDownVote(drawing: Drawing, vote: Vote): Observable<Vote>;

  removeUpVote(drawing: Drawing, userId: string): Observable<void>;

  removeDownVote(drawing: Drawing, userId: string): Observable<void>;

  addComment(drawing: Drawing, comment: Comment): Observable<Comment>;

  removeComment(drawing: Drawing, commentId: string): Observable<void>;

  addCommentUpVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote>;

  removeCommentUpVote(drawing: Drawing, comment: Comment, userId: string): Observable<void>;

  addCommentDownVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote>;

  removeCommentDownVote(drawing: Drawing, comment: Comment, userId: string): Observable<void>;
}

