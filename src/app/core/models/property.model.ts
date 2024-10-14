import { PropertyType } from "./property-type.enum";
import { Location } from "./location.model";
import { Amenity } from "./amenity.model";
import { Photo } from "./photo.model";
import { Review } from "./review.model";
import { Booking } from "./booking.model";
import { Host } from "./host.model";
import { Favorite } from "./favorite.model";

export interface Property {
keyFeatures: any;
  id: number;
  title: string;
  description?: string;
  location: Location;
  pricePerNight: number;
  maxGuests?: number;
  bedrooms?: number;
  beds?: number;
  bathrooms?: number;
  propertyType: PropertyType;
  amenities: Amenity[];
  photos: Photo[];
  reviews: Review[];
  bookings: Booking[];
  host: Host;
  favorites: Favorite[];
  createdAt: Date;
  updatedAt: Date;
  averageRating: number;
  totalReviews?: number;
  isFavorited?: boolean;
}
