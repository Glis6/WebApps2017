import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {
  /**
   * The amount of up votes.
   */
  @Input()
  public upVotes: number;

  /**
   * Emits when an up vote is given.
   */
  @Output('addUpVote')
  public upVote: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The amount of down votes.
   */
  @Input()
  public downVotes: number;

  /**
   * Emits when a down vote is given.
   */
  @Output('addDownVote')
  public downVote: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Gives an up vote.
   */
  addUpVote() {
    this.upVote.emit();
  }

  /**
   * Gives a down vote.
   */
  addDownVote() {
    this.downVote.emit();
  }
}
