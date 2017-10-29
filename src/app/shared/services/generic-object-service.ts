import {Observable} from 'rxjs/Observable';

export interface GenericObjectService<T, E> {
  /**
   * Creates the object in the collection.
   *
   * @param object The object to create.
   */
  create(object: T): Promise<T>;

  /**
   * @returns All objects in the collection.
   */
  getAll(): Observable<T[]>;

  /**
   * @param {E} documentId The ID of the object to look for.
   * @returns The found object.
   */
  getSingle(documentId: E): Observable<T>;

  /**
   * @param {E} documentId The ID of the object to look for.
   * @returns {Promise<void>} A promise when the object has been removed.
   */
  remove(documentId: E): Promise<void>;

  /**
   * @param {E} documentId The ID of the object to look for.
   * @param data The updating data.
   * @returns {Promise<void>} A promise when the object has been removed.
   */
  update(documentId: E, data: any): Promise<void>;
}
