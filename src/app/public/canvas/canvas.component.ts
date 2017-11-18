import {Component, Input, ElementRef, AfterViewInit, ViewChild, Inject} from '@angular/core';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/canvas.service";
import {Drawing} from "../../shared/models/drawing.class";
import {Rating} from "../../shared/models/rating.class";

@Component({
  selector: 'app-canvas',
  template: `
    <canvas #canvas [style.background]="backgroundColor"></canvas>
    <app-color-picker (color)="changeColor($event)"></app-color-picker>
    <app-width-picker (number)="changeWidth($event)"></app-width-picker>
    <button (click)="clearCanvas()">Clear</button>
    <button (click)="save()">Save</button>
  `,
  styles: [`
    canvas {
      border: 1px solid #000;
    }
  `]
})
export class CanvasComponent implements AfterViewInit {
  /**
   * The canvas itself.
   */
  @ViewChild('canvas')
  public canvas: ElementRef;

  /**
   * The width of the canvas.
   */
  @Input()
  public width = 400;

  /**
   * The height of the canvas.
   */
  @Input()
  public height = 400;

  /**
   * The background color for the canvas.
   */
  public backgroundColor = 'white';

  /**
   * The rendering context to draw the canvas.
   */
  private renderingContext: CanvasRenderingContext2D;

  constructor(@Inject(DRAWING_SERVICE) private drawingService: DrawingService) {
  }

  /**
   * Links the canvas to the rendering engine.
   */
  public ngAfterViewInit() {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    this.renderingContext = canvasElement.getContext('2d');

    canvasElement.width = this.width;
    canvasElement.height = this.height;

    this.renderingContext.lineWidth = 3;
    this.renderingContext.lineCap = 'round';
    this.renderingContext.strokeStyle = '#000';

    this.captureEvents(canvasElement);
  }

  /**
   * Captures the events in the canvas.
   */
  private captureEvents(canvasElement: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasElement, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasElement, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasElement, 'mouseup'))
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasElement.getBoundingClientRect();
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  /**
   * Draw on the canvas.
   */
  private drawOnCanvas(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.renderingContext) {
      return;
    }

    this.renderingContext.beginPath();

    if (prevPos) {
      this.renderingContext.moveTo(prevPos.x, prevPos.y);
      this.renderingContext.lineTo(currentPos.x, currentPos.y);
      this.renderingContext.stroke();
    }
  }

  save() {
    this.drawingService.createDrawing(new Drawing('Test', 'Gilles', this.renderingContext.canvas.toDataURL(), new Rating())).subscribe(() => {});
  }

  /**
   * Changes the color.
   *
   * @param {string} color The color to change the line to.
   */
  changeColor(color: string) {
    this.renderingContext.strokeStyle = color;
  }

  /**
   * Changes the width of the brush.
   *
   * @param {number} width The width to use.
   */
  changeWidth(width: number) {
    this.renderingContext.lineWidth = width;
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.renderingContext.clearRect(0, 0, this.width, this.height);
  }
}
