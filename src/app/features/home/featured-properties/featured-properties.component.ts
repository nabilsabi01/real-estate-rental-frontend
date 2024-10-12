import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { Property } from '../../../core/models/property.model';
import { Favorite } from '../../../core/models/favorite.model';
import { PropertyService } from '../../../core/services/property.service';
import { FavoriteService } from '../../../core/services/favorite.service';
import { AuthService } from '../../../core/services/auth.service';
import { PropertyCardComponent } from '../../../shared/components/property-card/property-card.component';
import {ProgressSpinnerModule} from "primeng/progressspinner";

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    PropertyCardComponent,
    ProgressSpinnerModule
  ],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css']
})
export class FeaturedPropertiesComponent implements OnInit {
  featuredProperties: Property[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private propertyService: PropertyService,
    private favoriteService: FavoriteService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  loadFeaturedProperties(): void {
    this.isLoading = true;
    this.error = null;
    this.propertyService.getFeaturedProperties().subscribe({
      next: (properties) => {
        this.featuredProperties = properties;
        this.isLoading = false;
        this.checkFavoriteStatus();
      },
      error: (error: unknown) => {
        console.error('Error fetching featured properties:', error);
        this.error = 'Failed to load featured properties. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  checkFavoriteStatus(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.featuredProperties.forEach(property => {
        this.favoriteService.isFavorite(property.id).subscribe({
          next: (isFavorite: boolean) => {
            property.isFavorited = isFavorite;
          },
          error: (error: unknown) => {
            console.error('Error checking favorite status:', error);
          }
        });
      });
    }
  }

  toggleFavorite(property: Property): void {
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.showMessage('error', 'Login Required', 'You need to login to add a room to Favorites');
      return;
    }

    if (property.isFavorited) {
      this.favoriteService.removeFavorite(property.id).subscribe({
        next: () => {
          property.isFavorited = false;
          this.showMessage('success', 'Favorites Updated', 'Removed from favorites');
        },
        error: (error: unknown) => {
          console.error('Error removing favorite:', error);
          this.showMessage('error', 'Error', 'Failed to remove from favorites');
        }
      });
    } else {
      this.favoriteService.addFavorite(property.id).subscribe({
        next: (favorite: Favorite) => {
          property.isFavorited = true;
          this.showMessage('success', 'Favorites Updated', 'Added to favorites');
        },
        error: (error: unknown) => {
          console.error('Error adding favorite:', error);
          this.showMessage('error', 'Error', 'Failed to add to favorites');
        }
      });
    }
  }

  private showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({
      severity,
      summary,
      detail,
      life: 3000
    });
  }
}
