import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyType } from '../models/property-type.enum';
import { Property } from '../models/property.model';


@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'http://localhost:8081/api/properties';

  private propertyTypeImages: Record<PropertyType, string> = {
    [PropertyType.APARTMENT]: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be',
    [PropertyType.HOUSE]: 'https://images.unsplash.com/photo-1560185127-6f33a07ae109',
    [PropertyType.VILLA]: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    [PropertyType.COTTAGE]: 'https://images.unsplash.com/photo-1599423300746-b62533397364',
    [PropertyType.CHALET]: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809',
    [PropertyType.BUNGALOW]: 'https://images.unsplash.com/photo-1601066522621-7c7460cfce80',
    [PropertyType.CABIN]: 'https://images.unsplash.com/photo-1519137847-b06d0041e807',
    [PropertyType.STUDIO]: 'https://images.unsplash.com/photo-1540501482015-eab1e73d8d9b',
    [PropertyType.CONDO]: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    [PropertyType.PENTHOUSE]: 'https://images.unsplash.com/photo-1520551739604-300d8e39d7f6',
    [PropertyType.LOFT]: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd',
    [PropertyType.FARMHOUSE]: 'https://images.unsplash.com/photo-1534235931045-60e50b978f7a',
    [PropertyType.TREEHOUSE]: 'https://images.unsplash.com/photo-1572274401801-ce308e2f17f8',
    [PropertyType.BOAT]: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957',
    [PropertyType.TENT]: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0',
    [PropertyType.YURT]: 'https://images.unsplash.com/photo-1595350710489-c7c7b6eb9ae6',
    [PropertyType.LUXURY_VILLA]: 'https://images.unsplash.com/photo-1534351590666-13e2c7b58a3f',
    [PropertyType.BED_AND_BREAKFAST]: 'https://images.unsplash.com/photo-1571091718767-a5f539e0d97c',
    [PropertyType.GUEST_HOUSE]: 'https://images.unsplash.com/photo-1582711012124-236c406b22aa'
  };


  constructor(private http: HttpClient) {}

  getPropertyTypes(): PropertyType[] {
    return Object.values(PropertyType);
  }

  getPropertyTypeImageUrl(type: PropertyType): string {
    return this.propertyTypeImages[type] || 'assets/images/property-types/default.jpg';
  }

  formatPropertyTypeName(type: PropertyType): string {
    return type.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  // Fetch all properties
  getAllProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.apiUrl);
  }

  // Fetch a single property by ID
  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.apiUrl}/${id}`);
  }

  // Create a new property
  createProperty(property: Property): Observable<Property> {
    return this.http.post<Property>(this.apiUrl, property);
  }

  // Update an existing property
  updateProperty(id: number, property: Property): Observable<Property> {
    return this.http.put<Property>(`${this.apiUrl}/${id}`, property);
  }

  // Delete a property
  deleteProperty(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Search properties (assuming your backend supports this)
  searchProperties(query: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.apiUrl}/search?q=${query}`);
  }

  // Add photos to a property
  addPhotosToProperty(id: number, photos: FormData): Observable<Property> {
    return this.http.post<Property>(`${this.apiUrl}/${id}/photos`, photos);
  }

  // Delete a photo from a property
  deletePhotoFromProperty(propertyId: number, photoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${propertyId}/photos/${photoId}`);
  }
}
