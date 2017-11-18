import {DrawingService} from "../canvas.service";
import {Observable} from "rxjs/Observable";
import {Drawing} from "../../models/drawing.class";
import {Http} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';
import {Vote} from "../../models/vote.class";

@Injectable()
export class ApiDrawingService implements DrawingService {
  private _appUrl = 'http://localhost:4200/API/drawings';

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
    return this.http.post(`${this._appUrl}/${drawing.id}/upvote/remove`, {userId: userId}).map(() => {});
  }

  removeDownVote(drawing: Drawing, userId: string): Observable<void> {
    drawing.removeDownVote(userId);
    return this.http.post(`${this._appUrl}/${drawing.id}/downvote/remove`, {userId: userId}).map(() => {});
  }

  getAll(): Observable<Drawing[]> {
    return this.http.get(`${this._appUrl}`)
      .map(response => response.json().map(item => Drawing.fromJSON(item)));
  }
}
