import { Property } from "./property.model";
import { User } from "./user.model";

export interface Host extends User {
  bio?: string;
  superHost: boolean;
  properties?: Property[];
}