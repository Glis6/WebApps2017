export class Drawing {
  /**
   * The id of the drawing.
   */
  private _id: string;

  static fromJSON(json): Drawing {
    const rec = new Drawing(json.name, json.author, json.canvas);
    rec._id = json._id;
    return rec;
  }

  constructor(private _name: string, private _author: string, private _canvas: string) {

  }

  toJSON() {
    return {
      _id: this._id,
      name: this._name,
      author: this._author,
      canvas: this._canvas
    };
  }
}
