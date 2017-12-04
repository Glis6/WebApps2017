import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Drawing} from "../../shared/models/drawing.class";
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {MessageService} from "../../shared/services/message.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-edit-drawing',
  templateUrl: './edit-drawing.component.html',
  styleUrls: ['./edit-drawing.component.css']
})
export class EditDrawingComponent implements OnInit {
  /**
   * The drawing we're editing.
   */
  public drawing: Drawing;

  private _canvasUrl: string;

  constructor(private route: ActivatedRoute,
              @Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const drawingId: string = params.get('drawingId');
      this.drawingService.getDrawing(drawingId).subscribe(drawing => this.drawing = drawing);
    });
  }

  set canvasUrl(canvasUrl: string) {
    this._canvasUrl = canvasUrl;
    if(this.drawing && this.drawing.canvas != canvasUrl) {
      this.messageService.warning('There are some unsaved changes.');
    }
  }

  saveChanges() {
    this.messageService.info('Saving your changes...');
    this.drawing.canvas = this._canvasUrl;
    const subscription: Subscription = this.drawingService.saveDrawing(this.drawing).subscribe((response: Drawing) => {
      if(response) {
        this.drawing = response;
        this.messageService.info('Your changes have been saved.');
        subscription.unsubscribe();
      }
    });
  }
}
