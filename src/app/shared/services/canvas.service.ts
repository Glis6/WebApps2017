import {InjectionToken} from "@angular/core";
import {Drawing} from "../models/drawing.class";
import {Observable} from "rxjs/Observable";

/**
 * An injection token for the {@link DrawingService}.
 */
export const DRAWING_SERVICE = new InjectionToken<DrawingService>('drawing.service');

export interface DrawingService {
  getDrawing(id: string): Observable<Drawing>;

  saveDrawing(drawing: Drawing): Observable<Drawing>;
}

