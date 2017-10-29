import {Character} from "./character.interface";

export interface User {
  /**
   * The ID of the user.
   */
  id: string;

  /**
   * The e-mail address of the user.
   */
  emailAddress: string;

  /**
   * The display name of the user.
   */
  displayName: string;

  /**
   * All characters that the user has registered.
   */
  characters: Character[];
}
