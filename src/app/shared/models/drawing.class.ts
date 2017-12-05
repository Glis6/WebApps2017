import {Rating} from "./rating.class";
import {Vote} from "./vote.class";
import {Comment} from "./comment.class";

export class Drawing {
  /**
   * The id of the drawing.
   */
  private _id: string;

  /**
   * Loads an instance of the object from JSON.
   */
  static fromJSON(json): Drawing {
    const rec = new Drawing(json.name, json.author, json.canvas, Rating.fromJSON(json.rating), json.comments.map(comment => Comment.fromJSON(comment)));
    rec._id = json._id;
    return rec;
  }

  /**
   * @param {string} _name The name of the drawing.
   * @param {string} _author The author of the drawing.
   * @param {string} _canvas The canvas the drawing was made on.
   * @param _rating The rating for this drawing.
   * @param _comments The comments for this drawing.
   */
  constructor(private _name: string, private _author: string, private _canvas: string, private _rating: Rating = new Rating(), private _comments: Comment[] = []) {
  }

  get id(): string {
    return this._id;
  }

  /**
   * @returns {string} The name of the drawing.
   */
  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  /**
   * @returns {string} The author of the drawing.
   */
  get author(): string {
    return this._author;
  }

  /**
   * @returns {string} The canvas the drawing was made on.
   */
  get canvas(): string {
    return this._canvas;
  }

  set canvas(canvas: string) {
    this._canvas = canvas;
  }

  get upVotes(): number {
    return this._rating.upVotes || 0;
  }

  get downVotes(): number {
    return this._rating.downVotes || 0;
  }

  get comments(): Comment[] {
    return this._comments.sort((a, b) => (b.upVotes - b.downVotes) - (a.upVotes - a.downVotes));
  }

  /* VOTES */
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

  /* COMMENTS */
  addComment(comment: Comment) {
    return this._comments.push(comment);
  }

  removeComment(commentId: string) {
    const index = this._comments.findIndex(commentInList => commentInList.id == commentId);
    if(index >= 0)
      this._comments.splice(index, 1);
  }

  /**
   * Converts the object to JSON.
   */
  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      author: this._author,
      canvas: this._canvas,
      rating: this._rating.toJSON(),
      comments: this._comments.map(comment => comment.toJSON()),
    };
  }
}
