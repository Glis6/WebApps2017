import {DrawingService} from "../canvas.service";
import {Observable} from "rxjs/Observable";
import {Drawing} from "../../models/drawing.class";
import {Http} from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map';

@Injectable()
export class ApiDrawingService implements DrawingService {
  private _appUrl = 'http://localhost:4200/API/drawings';

  constructor(private http: Http) {
  }

  getDrawing(id: string): Observable<Drawing> {
    return this.http.get(`${this._appUrl}/${id}`)
      .map(response => response.json()).map(item => Drawing.fromJSON(item));
  }

  saveDrawing(drawing: Drawing): Observable<Drawing> {
    return this.http.post(`${this._appUrl}/create`, drawing).map(result => result.json()).map(item => Drawing.fromJSON(item));
  }
}
