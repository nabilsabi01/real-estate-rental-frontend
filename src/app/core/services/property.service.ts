import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from '../models/property.model';
import { PropertyType } from '../models/property-type.enum';
import { environment } from '../../../environments/environment';

export interface SearchResponse {
  content: Property[];
  totalPages: number;
  totalElements: number;
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/v1/properties`;

  private propertyTypeImages: Record<PropertyType, string> = {
    [PropertyType.APARTMENT]: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&w=500&q=60',
    [PropertyType.HOUSE]: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&w=500&q=60',
    [PropertyType.VILLA]: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&w=500&q=60',
    [PropertyType.COTTAGE]: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&w=500&q=60',
    [PropertyType.CHALET]: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&w=500&q=60',
    [PropertyType.BUNGALOW]: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&w=500&q=60', // Updated Bungalow URL
    [PropertyType.CABIN]: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&w=500&q=60',
    [PropertyType.STUDIO]: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&w=500&q=60',
    [PropertyType.CONDO]: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&w=500&q=60', // Updated Condo URL
    [PropertyType.PENTHOUSE]: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&w=500&q=60',
    [PropertyType.LOFT]: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&w=500&q=60',
    [PropertyType.FARMHOUSE]: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&w=500&q=60',
    [PropertyType.TREEHOUSE]: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&w=500&q=60',
    [PropertyType.BOAT]: 'https://images.unsplash.com/photo-1566847438217-76e82d383f84?auto=format&w=500&q=60',
    [PropertyType.TENT]: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&w=500&q=60',
    [PropertyType.YURT]: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&w=500&q=60',
    [PropertyType.LUXURY_VILLA]: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&w=500&q=60',
    [PropertyType.BED_AND_BREAKFAST]: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&w=500&q=60',
    [PropertyType.GUEST_HOUSE]: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&w=500&q=60'
  };

  constructor(private http: HttpClient) {}

  createProperty(property: Partial<Property>, photos: File[]): Observable<Property> {
    const formData = new FormData();
    formData.append('property', JSON.stringify(property));
    photos.forEach((photo, index) => {
      formData.append(`photos`, photo, photo.name);
    });
    return this.http.post<Property>(this.apiUrl, formData);
  }

  getPropertyById(id: number, guestId?: number): Observable<Property> {
    let params = new HttpParams();
    if (guestId) {
      params = params.set('guestId', guestId.toString());
    }
    return this.http.get<Property>(`${this.apiUrl}/${id}`, { params });
  }

  getAllProperties(page = 0, size = 20, guestId?: number): Observable<{content: Property[], totalPages: number, totalElements: number}> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    if (guestId) {
      params = params.set('guestId', guestId.toString());
    }
    return this.http.get<{content: Property[], totalPages: number, totalElements: number}>(this.apiUrl, { params });
  }

  updateProperty(id: number, property: Partial<Property>, photos?: File[]): Observable<Property> {
    const formData = new FormData();
    formData.append('property', JSON.stringify(property));
    if (photos) {
      photos.forEach((photo, index) => {
        formData.append(`photos`, photo, photo.name);
      });
    }
    return this.http.put<Property>(`${this.apiUrl}/${id}`, formData);
  }

  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getFeaturedProperties(guestId?: number): Observable<Property[]> {
    let params = new HttpParams();
    if (guestId) {
      params = params.set('guestId', guestId.toString());
    }
    return this.http.get<Property[]>(`${this.apiUrl}/featured`, { params });
  }

  toggleFavorite(propertyId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${propertyId}/favorite`, {});
  }

  searchProperties(
    destination: string,
    checkIn: string | null,
    checkOut: string | null,
    guests: number,
    page: number = 0,
    size: number = 20
  ): Observable<any> {
    let params = new HttpParams()
      .set('destination', destination)
      .set('page', page.toString())
      .set('size', size.toString())
      .set('guests', guests.toString());

    if (checkIn) params = params.set('checkIn', checkIn);
    if (checkOut) params = params.set('checkOut', checkOut);

    return this.http.get<any>(`${this.apiUrl}/search`, { params });
  }

  getPropertyTypes(): PropertyType[] {
    return Object.values(PropertyType);
  }

  getPropertyTypeImageUrl(type: PropertyType): string {
    return this.propertyTypeImages[type] || 'assets/images/property-types/default.jpg';
  }

  formatPropertyTypeName(type: PropertyType): string {
    return type.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
}