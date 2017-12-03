export class User {
  /**
   * The id of the drawing.
   */
  private _id: string;

  /**
   * Loads an instance of the object from JSON.
   */
  static fromJSON(json): User {
    const rec = new User(json.emailAddress, json.name);
    rec._id = json._id;
    return rec;
  }

  /**
   * @param _emailAddress The e-mail address of the user.
   * @param  _name The name of the user.
   */
  constructor(private _emailAddress: string, private _name: { firstName: string, lastName: string }) {
  }

  /**
   * @returns {string} The e-mail address of the user.
   */
  get emailAddress(): string {
    return this._emailAddress;
  }

  /**
   * @returns {string} The full name of the user.
   */
  get fullName(): string {
    return this._name.firstName + ' ' + this._name.lastName;
  }

  /**
   * @returns {string} The first name of the user.
   */
  get firstName(): string {
    return this._name.firstName;
  }

  /**
   * @returns {string} The last name of the user.
   */
  get lastName(): string {
    return this._name.lastName;
  }

  get id(): string {
    return this._id;
  }

  /**
   * Converts the object to JSON.
   */
  toJSON() {
    return {
      _id: this._id,
      name: this._name
    };
  }
}
