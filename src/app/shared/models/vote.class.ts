export class Vote {
  /**
   * The id of the vote.
   */
  private _id: string;

  /**
   * Loads an instance of the object from JSON.
   */
  static fromJSON(json): Vote {
    const rec = new Vote(json.userId, json.timestamp);
    rec._id = json._id;
    return rec;
  }

  constructor(private _userId: string, private _timestamp: Date) {
  }

  get userId(): string {
    return this._userId;
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
      userId: this._userId,
      timestamp: this._timestamp,
    };
  }
}
