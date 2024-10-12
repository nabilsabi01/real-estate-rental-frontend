import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Favorite } from '../models/favorite.model';

interface PagedResponse<T> {
  content: T[];
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = `${environment.apiUrl}/v1/favorites`;

  constructor(private http: HttpClient) {}

  getFavorites(page: number = 0, size: number = 12): Observable<PagedResponse<Favorite>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get<PagedResponse<Favorite>>(this.apiUrl, { params });
  }

  addFavorite(propertyId: number): Observable<Favorite> {
    return this.http.post<Favorite>(`${this.apiUrl}/${propertyId}`, {});
  }

  removeFavorite(propertyId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${propertyId}`);
  }

  isFavorite(propertyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check/${propertyId}`);
  }
}