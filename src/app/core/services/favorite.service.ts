import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {Favorite} from "../models/favorite.model";

interface PagedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/api/v1/favorites`;

  constructor(private http: HttpClient) {}

  addFavorite(guestId: number, propertyId: number): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.apiUrl}/guests/${guestId}/properties/${propertyId}`, {})
      .pipe(
        map(this.adjustFavoriteDate),
        catchError(this.handleError)
      );
  }

  getFavoritesByGuestId(guestId: number, page: number = 0, size: number = 20): Observable<PagedResponse<Favorite>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PagedResponse<Favorite>>(`${this.apiUrl}/guests/${guestId}`, { params })
      .pipe(
        map(response => ({
          ...response,
          content: response.content.map(this.adjustFavoriteDate)
        })),
        catchError(this.handleError)
      );
  }

  removeFavorite(guestId: number, propertyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/guests/${guestId}/properties/${propertyId}`)
      .pipe(catchError(this.handleError));
  }

  isFavorite(guestId: number, propertyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/guests/${guestId}/properties/${propertyId}`)
      .pipe(catchError(this.handleError));
  }

  getFavoriteCount(propertyId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/properties/${propertyId}/count`)
      .pipe(catchError(this.handleError));
  }

  private adjustFavoriteDate(favorite: Favorite): Favorite {
    return {
      ...favorite,
      favoritedAt: new Date(favorite.favoritedAt)
    };
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server error'));
  }
}
