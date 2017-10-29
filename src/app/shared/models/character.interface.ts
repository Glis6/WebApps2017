import {Class} from "./class.interface";
import {Specialization} from "./specialization.interface";

export interface Character {
  name: string;
  characterClass: Class;
  mainSpec: Specialization;
  offSpecs: Specialization[];
}
