import {ClassService} from "./class.service";
import {Class} from "../models/class.interface";
import {Observable} from "rxjs/Observable";

/**
 * Definitions for all classes.
 */
const classes: Class[] = [
  {
    uid: 'Paladin',
    name: 'Paladin',
    icon: '',
    specialization: [
      {
        name: 'Holy',
        icon: '',
        role: 'Healer'
      },
      {
        name: 'Retribution',
        icon: '',
        role: 'Melee'
      },
      {
        name: 'Protection',
        icon: '',
        role: 'Tank'
      }
    ]
  },
  {
    uid: 'Priest',
    name: 'Priest',
    icon: '',
    specialization: [
      {
        name: 'Holy',
        icon: '',
        role: 'Healer'
      },
      {
        name: 'Discipline',
        icon: '',
        role: 'Healer'
      },
      {
        name: 'Shadow',
        icon: '',
        role: 'Ranged'
      }
    ]
  }
];

export class LocalClassService implements ClassService {
  create(object: Class): Promise<Class> {
    throw new Error("Method not implemented.");
  }

  getAll(): Observable<Class[]> {
    return Observable.of(classes);
  }

  getSingle(documentId: string): Observable<Class> {
    return Observable.of(classes.filter(clazz => clazz.uid == documentId).pop());
}

  remove(documentId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  update(documentId: string, data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

}
