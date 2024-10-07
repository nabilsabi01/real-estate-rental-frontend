import { BookingStatus } from "./booking-status.enum";
import { Guest } from "./guest.model";
import { Property } from "./property.model";

export interface Booking {
    id: number;
    property: Property;
    guest: Guest;
    checkInDate: Date;
    checkOutDate: Date;
    status: BookingStatus;
    totalPrice: number;
    numberOfGuests?: number;
    createdAt: Date;
    updatedAt: Date;
  }