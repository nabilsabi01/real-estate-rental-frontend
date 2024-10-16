import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';
import { BookingStatus } from '../models/booking-status.enum';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  private apiUrl = `${environment.apiUrl}/api/v1/bookings`;

  constructor(private http: HttpClient) {}


  createBooking(booking: Partial<Booking>): Observable<Booking> {
    return this.http.post<Booking>(this.apiUrl, booking);
  }

  isBookingAvailable(propertyId: number, checkIn: Date, checkOut: Date): Observable<boolean> {
    const params = new HttpParams()
      .set('propertyId', propertyId.toString())
      .set('checkIn', checkIn.toISOString())
      .set('checkOut', checkOut.toISOString());
    return this.http.get<boolean>(`${this.apiUrl}/availability`, { params });
  }

  getBooking(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${this.apiUrl}/${id}`);
  }

  getBookingsByGuest(guestId: number, page = 0, size = 20): Observable<{content: Booking[], totalPages: number, totalElements: number}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{content: Booking[], totalPages: number, totalElements: number}>(`${this.apiUrl}/guests/${guestId}`, { params });
  }

  getBookingsByProperty(propertyId: number, page = 0, size = 20): Observable<{content: Booking[], totalPages: number, totalElements: number}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{content: Booking[], totalPages: number, totalElements: number}>(`${this.apiUrl}/properties/${propertyId}`, { params });
  }

  updateBookingStatus(id: number, status: BookingStatus): Observable<Booking> {
    return this.http.patch<Booking>(`${this.apiUrl}/${id}/status`, null, {
      params: { status: status.toString() }
    });
  }

  cancelBooking(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBookingPrice(propertyId: number, checkInDate: Date, checkOutDate: Date): Observable<number> {
    const params = new HttpParams()
      .set('propertyId', propertyId.toString())
      .set('checkInDate', checkInDate.toISOString())
      .set('checkOutDate', checkOutDate.toISOString());
    return this.http.get<number>(`${this.apiUrl}/price`, { params });
  }
}