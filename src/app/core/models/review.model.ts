import { Guest } from "./guest.model";
import { Property } from "./property.model";

export interface Review {
    id: number;
    property: Property;
    guest: Guest;
    rating: number;
    comment?: string;
    createdAt: Date;
    updatedAt: Date;
}