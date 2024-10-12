import { Guest } from "./guest.model";
import { Property } from "./property.model";

export interface Favorite {
  id: number;
  property: Property;
  guest: Guest;
  favoritedAt: Date;
}
