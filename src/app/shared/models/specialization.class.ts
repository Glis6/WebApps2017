import {Role} from './role.class';

export class Specialization {
  /**
   * @param {string} _name The name of the speciality.
   * @param {string} _icon The icon for the speciality.
   * @param {Role} _role The role of the spec.
   */
  constructor(private _name: string, private _icon: string, private _role: Role) {
  }

  get name(): string {
    return this._name;
  }

  get icon(): string {
    return this._icon;
  }

  get role(): Role {
    return this._role;
  }
}
