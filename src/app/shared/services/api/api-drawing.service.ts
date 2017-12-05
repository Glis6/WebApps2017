import {DrawingService} from "../drawing.service";
import {Observable} from "rxjs/Observable";
import {Drawing} from "../../models/drawing.class";
import {Headers, Http} from '@angular/http';
import {Inject, Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Vote} from "../../models/vote.class";
import {Comment} from "../../models/comment.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../authentication.service";

@Injectable()
export class ApiDrawingService implements DrawingService {
  /**
   * The URL to do operations on.
   */
  private _appUrl = '/API/drawings';

  /**
   * @param {Http} http The Http connection to use.
   * @param {AuthenticationService} authenticationService The authenticationService to provide the token.
   */
  constructor(private http: Http,
              @Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService) {
  }

  getDrawing(id: string): Observable<Drawing> {
    return this.http.get(`${this._appUrl}/${id}`, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(response => response.json())
      .map(item => Drawing.fromJSON(item));
  }

  getDrawingsForUser(user: string): Observable<Drawing[]> {
    return this.http.get(`${this._appUrl}/user/${user}`, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(response => response.json()
        .map(item => Drawing.fromJSON(item)));
  }

  removeDrawing(drawing: Drawing): Observable<void> {
    return this.http.delete(`${this._appUrl}/${drawing.id}`, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})}).map(() => {
    });
  }

  createDrawing(drawing: Drawing): Observable<Drawing> {
    return this.http.post(`${this._appUrl}/create`, drawing.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => Drawing.fromJSON(item));
  }

  saveDrawing(drawing: Drawing): Observable<Drawing> {
    return this.http.post(`${this._appUrl}/${drawing.id}/save`, drawing.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => Drawing.fromJSON(item));
  }

  getAll(): Observable<Drawing[]> {
    return this.http.get(`${this._appUrl}`)
      .map(response => response.json()
        .map(item => Drawing.fromJSON(item)));
  }

  /* VOTES */
  addUpVote(drawing: Drawing, vote: Vote): Observable<Vote> {
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/add`, vote.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => {
        const vote = Vote.fromJSON(item);
        drawing.addUpVote(vote);
        return vote;
      });
  }

  addDownVote(drawing: Drawing, vote: Vote): Observable<Vote> {
    drawing.addDownVote(vote);
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/add`, vote.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => Vote.fromJSON(item));
  }

  removeUpVote(drawing: Drawing, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/remove`, {user: userId}, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})}).map(() => {
      drawing.removeUpVote(userId);
    });
  }

  removeDownVote(drawing: Drawing, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/remove`, {user: userId}, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})}).map(() => {
      drawing.removeDownVote(userId);
    });
  }

  /* COMMENTS */
  addComment(drawing: Drawing, comment: Comment): Observable<Comment> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/add`, comment.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => {
        drawing.addComment(comment);
        return comment;
      });
  }

  removeComment(drawing: Drawing, commentId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/remove`, {comment: commentId}, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})}).map(() => {
      drawing.removeComment(commentId);
    })
  }

  addCommentUpVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/upvote/add`, vote.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => {
        const vote: Vote = Vote.fromJSON(item);
        comment.addUpVote(vote);
        return vote;
      });
  }

  removeCommentUpVote(drawing: Drawing, comment: Comment, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/upvote/remove`, {user: userId}, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(() => {
        comment.removeUpVote(userId);
      });
  }

  addCommentDownVote(drawing: Drawing, comment: Comment, vote: Vote): Observable<Vote> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/downvote/add`, vote.toJSON(), {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(result => result.json())
      .map(item => {
        const vote: Vote = Vote.fromJSON(item);
        comment.addDownVote(vote);
        return vote;
      });
  }

  removeCommentDownVote(drawing: Drawing, comment: Comment, userId: string): Observable<void> {
    return this.http.post(`${this._appUrl}/${drawing.id}/comment/${comment.id}/downvote/remove`, {user: userId}, {headers: new Headers({Authorization: `Bearer ${this.authenticationService.token}`})})
      .map(() => {
        comment.removeDownVote(userId);
      });
  }
}
