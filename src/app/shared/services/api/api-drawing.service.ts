import {DrawingService} from "../drawing.service";
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
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => {
        const vote = Vote.fromJSON(item);
        drawing.addUpVote(vote);
        return vote;
      });
  }

  addDownVote(drawing: Drawing, vote: Vote): Observable<Vote> {
    drawing.addDownVote(vote);
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => Vote.fromJSON(item));
  }

  removeUpVote(drawing: Drawing, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/remove`, {user: userId}).map(() => {
      drawing.removeUpVote(userId);
    });
  }

  removeDownVote(drawing: Drawing, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/remove`, {user: userId}).map(() => {
      drawing.removeDownVote(userId);
    });
  }

  /* COMMENTS */
  addComment(drawing: Drawing, comment: Comment): Observable<Comment> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/add`, comment.toJSON())
      .map(result => result.json())
      .map(item => {
        const comment: Comment = Comment.fromJSON(item);
        drawing.addComment(comment);
        return comment;
      });
  }

  removeComment(drawing: Drawing, commentId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/remove`, {comment: commentId}).map(() => {
      drawing.removeComment(commentId);
    })
  }

  addCommentUpVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/upvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => {
        const vote: Vote = Vote.fromJSON(item);
        comment.addUpVote(vote);
        return vote;
      });
  }

  removeCommentUpVote(drawing: Drawing, comment: Comment, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/upvote/remove`, {user: userId})
      .map(() => {
        comment.removeUpVote(userId);
      });
  }

  addCommentDownVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/downvote/add`, vote.toJSON())
      .map(result => result.json())
      .map(item => {
        const vote: Vote = Vote.fromJSON(item);
        comment.addDownVote(vote);
        return vote;
      });
  }

  removeCommentDownVote(drawing: Drawing, comment: Comment, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/downvote/remove`, {user: userId})
      .map(() => {
        comment.removeDownVote(userId);
      });
  }
}
