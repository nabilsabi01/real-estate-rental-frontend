import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PropertyService } from '../../core/services/property.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { Property } from '../../core/models/property.model';
import { SearchBarComponent } from '../../shared/components/search-bar/search-bar.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule, 
    SearchBarComponent, 
    HeaderComponent, 
    FooterComponent, 
    MatPaginatorModule
  ],
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  properties: Property[] = [];
  loading: boolean = false;
  error: string | null = null;
  
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  currentPhotoIndices: { [key: number]: number } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private favoriteService: FavoriteService
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
      this.pageSize
    ).subscribe({
      next: (response) => {
        this.properties = response.content;
        this.totalElements = response.totalElements;
        this.loading = false;
        this.initializePhotoIndices();
        this.updateFavoriteStatus();
      },
      error: (err) => {
        this.error = "Failed to fetch properties. Please try again.";
        this.loading = false;
      }
    });
  }

  initializePhotoIndices() {
    this.properties.forEach(property => {
      this.currentPhotoIndices[property.id] = 0;
    });
  }

  updateFavoriteStatus() {
    this.properties.forEach(property => {
      this.favoriteService.isFavorite(property.id).subscribe(
        isFavorite => property.isFavorited = isFavorite
      );
    });
  }

  toggleFavorite(property: Property) {
    if (property.isFavorited) {
      this.favoriteService.removeFavorite(property.id).subscribe({
        next: () => property.isFavorited = false,
        error: (err) => console.error('Error removing favorite:', err)
      });
    } else {
      this.favoriteService.addFavorite(property.id).subscribe({
        next: () => property.isFavorited = true,
        error: (err) => console.error('Error adding favorite:', err)
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.searchProperties(this.route.snapshot.queryParams);
  }

  viewDetails(propertyId: number) {
    this.router.navigate(['/property', propertyId], {
      queryParamsHandling: 'merge',
      queryParams: {
        checkIn: this.route.snapshot.queryParams['checkIn'],
        checkOut: this.route.snapshot.queryParams['checkOut'],
        guests: this.route.snapshot.queryParams['guests']
      }
    });
  }

  prevPhoto(propertyId: number) {
    if (this.currentPhotoIndices[propertyId] > 0) {
      this.currentPhotoIndices[propertyId]--;
    }
  }

  nextPhoto(propertyId: number) {
    const property = this.properties.find(p => p.id === propertyId);
    if (property && this.currentPhotoIndices[propertyId] < property.photos.length - 1) {
      this.currentPhotoIndices[propertyId]++;
    }
  }
}