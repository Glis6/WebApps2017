import {InjectionToken} from "@angular/core";
import {Drawing} from "../models/drawing.class";
import {Observable} from "rxjs/Observable";
import {Vote} from "../models/vote.class";

/**
 * An injection token for the {@link DrawingService}.
 */
export const DRAWING_SERVICE = new InjectionToken<DrawingService>('drawing.service');

export interface DrawingService {
  getDrawing(id: string): Observable<Drawing>;

  createDrawing(drawing: Drawing): Observable<Drawing>;

  addUpVote(drawing: Drawing, vote: Vote): Observable<Vote>;

  addDownVote(drawing: Drawing, vote: Vote): Observable<Vote>;

  removeUpVote(drawing: Drawing, userId: string): Observable<void>;

  removeDownVote(drawing: Drawing, userId: string): Observable<void>;

  getAll(): Observable<Drawing[]>;
}

