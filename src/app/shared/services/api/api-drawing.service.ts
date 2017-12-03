import {DrawingService} from "../canvas.service";
import {Observable} from "rxjs/Observable";
import {Drawing} from "../../models/drawing.class";
import {Http} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Vote} from "../../models/vote.class";
import {Comment} from "../../models/comment.class";

@Injectable()
export class ApiDrawingService implements DrawingService {
  private _appUrl = '/API/drawings';

  constructor(private http: Http) {
  }

  getDrawing(id: string): Observable<Drawing> {
    return this.http.get(`${this._appUrl}/${id}`)
      .map(response => response.json()).map(item => Drawing.fromJSON(item));
  }

  createDrawing(drawing: Drawing): Observable<Drawing> {
    return this.http.post(`${this._appUrl}/create`, drawing.toJSON())
      .map(result => result.json())
      .map(item => Drawing.fromJSON(item));
  }

  getAll(): Observable<Drawing[]> {
    return this.http.get(`${this._appUrl}`)
      .map(response => response.json().map(item => Drawing.fromJSON(item)));
  }

  /* VOTES */

  addUpVote(drawing: Drawing, vote: Vote): Observable<Vote> {
    drawing.addUpVote(vote);
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => Vote.fromJSON(item));
  }

  addDownVote(drawing: Drawing, vote: Vote): Observable<Vote> {
    drawing.addDownVote(vote);
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => Vote.fromJSON(item));
  }

  removeUpVote(drawing: Drawing, userId: string): Observable<void> {
    drawing.removeUpVote(userId);
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/remove`, {user: userId}).map(() => {});
  }

  removeDownVote(drawing: Drawing, userId: string): Observable<void> {
    drawing.removeDownVote(userId);
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/remove`, {user: userId}).map(() => {});
  }

  /* COMMENTS */
  addComment(drawing: Drawing, comment: Comment): Observable<Comment> {
    drawing.addComment(comment);
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/add`, comment.toJSON())
      .map(result => result.json())
      .map(item => Comment.fromJSON(item));
  }

  removeComment(drawing: Drawing, commentId: string): Observable<void> {
    drawing.removeComment(commentId);
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/remove`, {comment: commentId}).map(() => {})
  }

  addCommentUpVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote> {
    comment.addUpVote(vote);
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/upvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => Vote.fromJSON(item));
  }

  removeCommentUpVote(drawing: Drawing, comment: Comment, userId: string): Observable<void> {
    comment.removeUpVote(userId);
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/upvote/remove`, {user: userId})
      .map(() => {});
  }

  addCommentDownVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote> {
    comment.addDownVote(vote);
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/downvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => Vote.fromJSON(item));
  }

  removeCommentDownVote(drawing: Drawing, comment: Comment, userId: string): Observable<void> {
    comment.removeDownVote(userId);
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/downvote/remove`, {user: userId})
      .map(() => {});
  }
}
