import {Specialization} from './specialization.class';

export class Class {
  constructor(private _uid: string, private _name: string, private _icon: string, private _specialization: Specialization[]) {
  }

  get uid(): string {
    return this._uid;
  }

  get name(): string {
    return this._name;
  }

  get icon(): string {
    return this._icon;
  }

  get specialization(): Specialization[] {
    return this._specialization;
  }
}
