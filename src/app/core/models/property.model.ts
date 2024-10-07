import { Host } from "@angular/core";
import { Amenity } from "./amenity.model";
import { Booking } from "./booking.model";
import { Favorite } from "./favorite.model";
import { Photo } from "./photo.model";
import { PropertyType } from "./property-type.enum";
import { Review } from "./review.model";

export interface Property {
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
  }