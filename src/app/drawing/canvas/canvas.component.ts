import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, Inject, OnInit, Output,
  EventEmitter
} from '@angular/core';
import {Observable} from "rxjs/Observable";

import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/switchMap';
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {Drawing} from "../../shared/models/drawing.class";
import {Rating} from "../../shared/models/rating.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../../shared/services/authentication.service";
import {UserModule} from "../../user/user.module";
import {User} from "../../shared/models/user.class";
import {MessageService} from "../../shared/services/message.service";
import {AlertService} from "../../shared/services/alert.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
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
   * The canvas URL.
   */
  @Output()
  public canvasUrl: EventEmitter<string> = new EventEmitter<string>();

  /**
   * The canvas to start with.
   */
  @Input()
  public beginCanvas: string;

  /**
   * The background color for the canvas.
   */
  public backgroundColor = 'white';

  /**
   * The rendering context to draw the canvas.
   */
  private renderingContext: CanvasRenderingContext2D;

  /**
   * The width of the canvas.
   */
  @Input()
  public width: number = 750;

  /**
   * The height of the canvas.
   */
  @Input()
  public height: number = 750;

  /**
   * @param {AlertService} alertService The alertService to display alerts with.
   */
  constructor(private alertService: AlertService) {
  }

  /**
   * Links the canvas to the rendering engine.
   */
  ngAfterViewInit() {
    const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
    if (this.beginCanvas) {
      const img = new Image();
      img.addEventListener("load", function () {
        canvasElement.getContext("2d").drawImage(img, 0, 0);
      });
      img.setAttribute("src", this.beginCanvas);
      this.canvasUrl.emit(this.beginCanvas);
    }
    this.renderingContext = canvasElement.getContext('2d');

    this.renderingContext.lineWidth = 3;
    this.renderingContext.lineCap = 'round';
    this.renderingContext.strokeStyle = '#000000';

    this.captureEvents(canvasElement);
  }

  /**
   * Captures the events in the canvas.
   */
  private captureEvents(canvasElement: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasElement, 'mousedown')
      .switchMap(() => Observable
        .fromEvent(canvasElement, 'mousemove')
        .takeUntil(Observable.fromEvent(canvasElement, 'mouseup'))
        .pairwise()).subscribe((res: [MouseEvent, MouseEvent]) => {
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
    this.canvasUrl.emit(this.renderingContext.canvas.toDataURL());
  }

  /**
   * Changes the color.
   *
   * @param {string} color The color to change the line to.
   */
  changeColor(color: string) {
    if (this.renderingContext)
      this.renderingContext.strokeStyle = color;
  }

  /**
   * Changes the width of the brush.
   *
   * @param {number} width The width to use.
   */
  changeWidth(width: number) {
    if (this.renderingContext)
      this.renderingContext.lineWidth = width;
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.alertService.confirmation('Are you sure you want to clear the canvas? This cannot be undone.',
      {
        label: 'No',
        onClick: () => {
        }
      },
      {
        label: 'Yes',
        onClick: () => {
          const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
          this.renderingContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
          this.canvasUrl.emit(this.renderingContext.canvas.toDataURL());
        }
      });
  }

  /**
   * Clears the canvas.
   */
  resetToInitial() {
    if (!this.beginCanvas)
      return;
    this.alertService.confirmation('Are you sure you want to reset to the initial canvas? This cannot be undone.',
      {
        label: 'No',
        onClick: () => {
        }
      },
      {
        label: 'Yes',
        onClick: () => {
          const canvasElement: HTMLCanvasElement = this.canvas.nativeElement;
          this.renderingContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
          const img = new Image();
          img.addEventListener("load", function () {
            canvasElement.getContext("2d").drawImage(img, 0, 0);
          });
          img.setAttribute("src", this.beginCanvas);
          this.canvasUrl.emit(this.beginCanvas);
        }
      });
  }
}
