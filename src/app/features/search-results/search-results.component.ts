import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PropertyService } from '../../core/services/property.service';
import { Property } from '../../core/models/property.model';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, FormsModule, SearchBarComponent, HeaderComponent, FooterComponent, MatPaginatorModule],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  properties: Property[] = [];
  loading: boolean = false;
  error: string | null = null;
  isScrolled: boolean = true;
  currentSection: string = 'search-results';
  
  // Pagination
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  // Filters
  priceRange: number[] = [0, 1000];
  propertyTypes: string[] = ['Apartment', 'House', 'Villa'];
  selectedPropertyTypes: string[] = [];
  amenities: string[] = ['Wi-Fi', 'Pool', 'Gym', 'Parking'];
  selectedAmenities: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchProperties(params);
    });
  }

  searchProperties(searchData: any) {
    this.loading = true;
    this.error = null;
    this.propertyService.searchProperties(
      searchData.destination,
      searchData.checkIn,
      searchData.checkOut,
      searchData.guests,
      this.pageIndex,
      this.pageSize,
      // this.priceRange,
      // this.selectedPropertyTypes,
      // this.selectedAmenities
    ).subscribe({
      next: (response) => {
        this.properties = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Failed to fetch properties. Please try again.";
        this.loading = false;
      }
    });
  }

  toggleFavorite(property: Property) {
    this.propertyService.toggleFavorite(property.id).subscribe({
      next: () => {
        property.isFavorited = !property.isFavorited;
      },
      error: (err) => {
        console.error('Error toggling favorite:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchProperties(this.route.snapshot.queryParams);
  }

  applyFilters() {
    this.searchProperties(this.route.snapshot.queryParams);
  }
}