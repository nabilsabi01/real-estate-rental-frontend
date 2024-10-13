// src/app/features/favorites/favorites.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { Property } from '../../core/models/property.model';
import { AuthService } from '../../core/services/auth.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';
import { ToastNotificationsComponent } from '../../shared/components/toast-notifications/toast-notifications.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    HeaderComponent,
    FooterComponent,
    PropertyCardComponent,
    ToastNotificationsComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: Property[] = [];
  isLoading = true;
  error: string | null = null;
  totalRecords = 0;
  pageSize = 6;
  pageSizeOptions = [6, 12, 18];
  isScrolled = false;
  currentSection = 'favorites';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ToastNotificationsComponent) toastNotifications!: ToastNotificationsComponent;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(page: number = 0): void {
    this.isLoading = true;
    this.error = null;
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.error = 'User must be logged in to view favorites';
      this.isLoading = false;
      return;
    }

    this.favoriteService.getFavorites(page, this.pageSize).subscribe({
      next: (response) => {
        this.favorites = response.content.map(favorite => ({
          ...favorite.property,
          isFavorited: true
        }));
        this.totalRecords = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching favorites:', error);
        this.error = 'Failed to load favorites. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  removeFavorite(property: Property): void {
    this.favoriteService.removeFavorite(property.id).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(p => p.id !== property.id);
        this.totalRecords--;
        this.toastNotifications.showToast('success', 'Favorites Updated', 'Removed from favorites');
      },
      error: (error) => {
        console.error('Error removing favorite:', error);
        this.toastNotifications.showToast('error', 'Error', 'Failed to remove property from favorites');
      }
    });
  }

  onPageChange(event: any): void {
    this.loadFavorites(event.pageIndex);
  }
}