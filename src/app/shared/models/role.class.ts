export class Role {
  /**
   * @param {string} uid The UID of the object.
   * @param {string} _name The name of the role.
   * @param {string} _icon The icon for the role.
   */
  constructor(private uid: string, private _name: string, private _icon: string) {
  }

  get name() {
    return this._name;
  }

  get icon() {
    return this._icon;
  }
}
