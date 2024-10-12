import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private apiUrl = `${environment.apiUrl}/v1/reviews`;

  constructor(private http: HttpClient) {}


  createReview(review: Partial<Review>): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, review);
  }

  getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  getReviewsByPropertyId(propertyId: number, page = 0, size = 20): Observable<{content: Review[], totalPages: number, totalElements: number}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{content: Review[], totalPages: number, totalElements: number}>(`${this.apiUrl}/property/${propertyId}`, { params });
  }

  getReviewsByGuestId(guestId: number, page = 0, size = 20): Observable<{content: Review[], totalPages: number, totalElements: number}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{content: Review[], totalPages: number, totalElements: number}>(`${this.apiUrl}/guest/${guestId}`, { params });
  }

  getReviewsByHostId(hostId: number, page = 0, size = 20): Observable<{content: Review[], totalPages: number, totalElements: number}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{content: Review[], totalPages: number, totalElements: number}>(`${this.apiUrl}/host/${hostId}`, { params });
  }

  updateReview(id: number, review: Review): Observable<Review> {
    return this.http.put<Review>(`${this.apiUrl}/${id}`, review);
  }

  deleteReview(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
