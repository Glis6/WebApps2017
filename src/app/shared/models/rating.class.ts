import {Vote} from "./vote.class";

export class Rating {
  /**
   * The id of the rating.
   */
  private _id: string;

  /**
   * Loads an instance of the object from JSON.
   */
  static fromJSON(json): Rating {
    const rec = new Rating(json.upVotes.map(upVote => Vote.fromJSON(upVote)) || [], json.downVotes.map(downVote => Vote.fromJSON(downVote)) || []);
    rec._id = json._id;
    return rec;
  }

  constructor(private _upVotes: Vote[] = [], private _downVotes: Vote[] = []) {
  }

  get upVotes(): number {
    return this._upVotes.length || 0;
  }

  get downVotes(): number {
    return this._downVotes.length || 0;
  }

  addUpVote(vote: Vote) {
    this._upVotes.push(vote);
  }

  addDownVote(vote: Vote) {
    this._downVotes.push(vote);
  }

  removeUpVote(userId: string) {
    this._upVotes = this._upVotes.filter(vote => vote.userId != userId);
  }

  removeDownVote(userId: string) {
    this._downVotes = this._downVotes.filter(vote => vote.userId != userId);
  }

  hasUpVoted(userId: string): boolean {
    return this._upVotes.filter(value => value.userId == userId).length > 0;
  }

  hasDownVoted(userId: string): boolean {
    return this._downVotes.filter(value => value.userId == userId).length > 0;
  }

  /**
   * Converts the object to JSON.
   */
  toJSON() {
    return {
      _id: this._id,
      upVotes: this._upVotes.map(vote => vote.toJSON()),
      downVotes: this._downVotes.map(vote => vote.toJSON()),
    };
  }
}
