import {Specialization} from './specialization.interface';

export interface Class {
  uid: string;
  name: string;
  icon: string;
  specialization: Specialization[];
}
