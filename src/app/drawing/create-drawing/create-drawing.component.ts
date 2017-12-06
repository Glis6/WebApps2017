import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DRAWING_SERVICE, DrawingService} from "../../shared/services/drawing.service";
import {Router} from "@angular/router";
import {Drawing} from "../../shared/models/drawing.class";
import {User} from "../../shared/models/user.class";
import {AUTHENTICATION_SERVICE, AuthenticationService} from "../../shared/services/authentication.service";
import {Subscription} from "rxjs/Subscription";
import {Location} from "@angular/common";

@Component({
  selector: 'app-create-drawing',
  templateUrl: './create-drawing.component.html',
  styleUrls: ['./create-drawing.component.css']
})
export class CreateDrawingComponent implements OnInit {
  /**
   * The URL to the current canvas.
   */
  public canvasUrl: string;

  /**
   * The form to fill in about the canvas.
   */
  public form: FormGroup;

  /**
   * The currently logged in user.
   */
  public user: User;

  /**
   * @param {FormBuilder} formBuilder The formBuilder to use to create the form.
   * @param drawingService The drawingService to use to save the drawing.
   * @param router The router to use to redirect after saving.
   * @param authenticationService The authenticationService to provide the currently logged in user.
   * @param location The location to go back to.
   */
  constructor(private formBuilder: FormBuilder,
              @Inject(DRAWING_SERVICE) private drawingService: DrawingService,
              private router: Router,
              @Inject(AUTHENTICATION_SERVICE) private authenticationService: AuthenticationService,
              public location: Location) {

  }

  /**
   * Creates the form.
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]]
    });
    this.authenticationService.user.subscribe(user => this.user = user);
  }

  /**
   * Creates the drawing.
   */
  create() {
    if(this.form.valid && this.user) {
      const subscription: Subscription = this.drawingService.createDrawing(new Drawing(this.form.get('name').value, this.user.id, this.canvasUrl))
        .subscribe(drawing => {
          if(drawing) {
            subscription.unsubscribe();
            this.router.navigateByUrl('/portfolio');
          }
        })
    }
  }
}
