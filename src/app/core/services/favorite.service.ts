import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Favorite } from '../models/favorite.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/api/v1/favorites`;
  
  constructor(private http: HttpClient) {}

  addFavorite(guestId: number, propertyId: number): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.apiUrl}/guests/${guestId}/properties/${propertyId}`, {});
  }

  getFavoritesByGuestId(guestId: number, page = 0, size = 20): Observable<{content: Favorite[], totalPages: number, totalElements: number}> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<{content: Favorite[], totalPages: number, totalElements: number}>(`${this.apiUrl}/guests/${guestId}`, { params });
  }

  removeFavorite(guestId: number, propertyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/guests/${guestId}/properties/${propertyId}`);
  }

  isFavorite(guestId: number, propertyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/guests/${guestId}/properties/${propertyId}`);
  }

  getFavoriteCount(propertyId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/properties/${propertyId}/count`);
  }
}