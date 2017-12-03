import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comment',
  templateUrl: './write-comment.component.html',
  styleUrls: ['./write-comment.component.css']
})
export class CommentComponent implements OnInit {
  /**
   * The form that's being filled in.
   */
  private form: FormGroup;

  /**
   * The comment that has been added to the drawing.
   */
  @Output()
  public comment: EventEmitter<string> = new EventEmitter<string>();

  /**
   * @param {FormBuilder} formBuilder The formBuilder to create the form.
   */
  constructor(private formBuilder: FormBuilder) {
  }

  /**
   * Creates the form.
   */
  ngOnInit() {
    this.form = this.formBuilder.group({
      comment: ['', [Validators.required]]
    });
  }

  /**
   * Emits the comment if it's valid.
   */
  addComment() {
    if(this.form.valid) {
      this.comment.emit(this.form.get('comment').value);
    }
  }
}
