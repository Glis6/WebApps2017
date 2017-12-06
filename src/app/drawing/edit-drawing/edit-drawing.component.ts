import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Drawing} from "../../shared/models/drawing.class";
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {MessageService} from "../../shared/services/message.service";
import {Subscription} from "rxjs/Subscription";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";

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

  /**
   * The url to the current canvas.
   */
  private _canvasUrl: string;

  /**
   * The form to fill in the name with.
   */
  public form: FormGroup;

  constructor(private route: ActivatedRoute,
              @Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              private messageService: MessageService,
              private formBuilder: FormBuilder,
              public location: Location) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
    this.route.paramMap.subscribe((params: ParamMap) => {
      const drawingId: string = params.get('drawingId');
      this.drawingService.getDrawing(drawingId).subscribe(drawing => {
        this.drawing = drawing;
        this.form.get('name').setValue(drawing.name);
      });
    });
  }

  set canvasUrl(canvasUrl: string) {
    this._canvasUrl = canvasUrl;
    if (this.drawing && this.drawing.canvas != canvasUrl) {
      this.messageService.warning('There are some unsaved changes.');
    } else {
      this.messageService.clear();
    }
  }

  saveChanges() {
    if (this.form.valid) {
      this.messageService.info('Saving your changes...');
      this.drawing.canvas = this._canvasUrl;
      this.drawing.name = this.form.get('name').value;
      const subscription: Subscription = this.drawingService.saveDrawing(this.drawing).subscribe((response: Drawing) => {
        if (response) {
          this.drawing = response;
          this.messageService.info('Your changes have been saved.');
          subscription.unsubscribe();
        }
      });
    }
  }
}
