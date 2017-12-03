import {Rating} from "./rating.class";
import {Vote} from "./vote.class";

export class Comment {
  static fromJSON(json): Comment {
    const comment: Comment = new Comment(json.user, json.comment, Rating.fromJSON(json.rating));
    comment._id = json._id;
    return comment;
  }

  private _id: string;

  constructor(private _user: string, private _comment: string, private _rating: Rating) {
  }


  get user(): string {
    return this._user;
  }

  get comment(): string {
    return this._comment;
  }

  set comment(value: string) {
    this._comment = value;
  }

  get rating(): Rating {
    return this._rating;
  }

  get id(): string {
    return this._id;
  }

  /* RATING */
  addUpVote(vote: Vote) {
    this._rating.addUpVote(vote);
  }

  addDownVote(vote: Vote) {
    this._rating.addDownVote(vote);
  }

  removeUpVote(userId: string) {
    this._rating.removeUpVote(userId);
  }

  removeDownVote(userId: string) {
    this._rating.removeDownVote(userId);
  }

  hasUpVoted(userId: string): boolean {
    return this._rating.hasUpVoted(userId);
  }

  hasDownVoted(userId: string): boolean {
    return this._rating.hasDownVoted(userId);
  }

  /**
   * Converts the object to JSON.
   */
  toJSON() {
    return {
      _id: this._id,
      user: this._user,
      comment: this._comment,
      rating: this._rating.toJSON()
    };
  }
}
