import {UserService} from "../user.service";
import {User} from "../../models/user.interface";
import {Observable} from "rxjs/Observable";
import {AngularFirestore} from "angularfire2/firestore";
import {Injectable} from "@angular/core";

/**
 * The directory where the users are saved.
 */
const USERS_DIRECTORY = 'users';

@Injectable()
export class UserDatabaseService implements UserService {
  /**
   * @param {AngularFirestore} database The database to use.
   */
  constructor(private database: AngularFirestore) {
  }

  create(object: User): Promise<User> {
    return this.database
      .collection(USERS_DIRECTORY)
      .doc(object.id)
      .set(object)
      .then(result => object);
  }

  getAll(): Observable<User[]> {
    return this.database
      .collection(USERS_DIRECTORY).valueChanges();
  }

  getSingle(documentId: string): Observable<User> {
    return this.database
      .collection(USERS_DIRECTORY)
      .doc(documentId)
      .valueChanges();
  }

  remove(documentId: string): Promise<void> {
    return this.database
      .collection(USERS_DIRECTORY)
      .doc(documentId)
      .delete();
  }

  update(documentId: string, data: any): Promise<void> {
    return this.database
      .collection(USERS_DIRECTORY)
      .doc(documentId)
      .update(data);
  }
}
