import { Booking } from "./booking.model";
import { Favorite } from "./favorite.model";
import { Review } from "./review.model";
import { User } from "./user.model";

export interface Guest extends User {
  bookings?: Booking[];
  writtenReviews?: Review[];
  favorites?: Favorite[];
}