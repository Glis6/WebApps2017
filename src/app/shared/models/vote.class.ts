export class Vote {
  /**
   * The id of the vote.
   */
  private _id: string;

  /**
   * Loads an instance of the object from JSON.
   */
  static fromJSON(json): Vote {
    const rec = new Vote(json.user, json.timestamp);
    rec._id = json._id;
    return rec;
  }

  constructor(private _user: string, private _timestamp: Date) {
  }

  get user(): string {
    return this._user;
  }

  get timestamp(): Date {
    return this._timestamp
  }

  /**
   * Converts the object to JSON.
   */
  toJSON() {
    return {
      _id: this._id,
      user: this._user,
      timestamp: this._timestamp,
    };
  }
}
