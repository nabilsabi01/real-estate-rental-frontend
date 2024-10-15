import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Amenity } from '../models/amenity.model';

@Injectable({
  providedIn: 'root'
})
export class AmenityService {
  private apiUrl = `${environment.apiUrl}/v1/amenities`;

  constructor(private http: HttpClient) {}

  getAllAmenities(page: number = 0, size: number = 10, sort: string = 'name'): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getAmenityById(id: number): Observable<Amenity> {
    return this.http.get<Amenity>(`${this.apiUrl}/${id}`);
  }

  createAmenity(amenity: Amenity): Observable<Amenity> {
    return this.http.post<Amenity>(this.apiUrl, amenity);
  }

  updateAmenity(id: number, amenity: Amenity): Observable<Amenity> {
    return this.http.put<Amenity>(`${this.apiUrl}/${id}`, amenity);
  }

  deleteAmenity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchAmenities(name: string, page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('name', name)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  getAmenitiesByPropertyId(propertyId: number): Observable<Amenity[]> {
    return this.http.get<Amenity[]>(`${this.apiUrl}/property/${propertyId}`);
  }

  getMostPopularAmenities(page: number = 0, size: number = 10): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/popular`, { params });
  }
}