import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { Property } from '../../core/models/property.model';
import { AuthService } from '../../core/services/auth.service';
import { FavoriteService } from '../../core/services/favorite.service';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PropertyCardComponent } from '../../shared/components/property-card/property-card.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    RouterModule,
    HeaderComponent,
    FooterComponent,
    PropertyCardComponent
  ],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  dataSource: MatTableDataSource<Property>;
  isLoading = true;
  error: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private favoriteService: FavoriteService,
    private authService: AuthService
  ) {
    this.dataSource = new MatTableDataSource<Property>([]);
  }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.isLoading = true;
    this.error = null;
    const userId = this.authService.getCurrentUserId();
    if (!userId) {
      this.error = 'User must be logged in to view favorites';
      this.isLoading = false;
      return;
    }

    this.favoriteService.getFavorites().subscribe({
      next: (response) => {
        const favorites = response.content.map(favorite => ({
          ...favorite.property,
          isFavorite: true
        }));
        this.dataSource.data = favorites;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching favorites:', error);
        this.error = 'Failed to load favorites. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  toggleFavorite(property: Property): void {
    if (property.isFavorited) {
      this.favoriteService.removeFavorite(property.id).subscribe({
        next: () => {
          this.dataSource.data = this.dataSource.data.filter(p => p.id !== property.id);
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
    } else {
      this.favoriteService.addFavorite(property.id).subscribe({
        next: () => {
          property.isFavorited = true;
          this.dataSource.data = [...this.dataSource.data, property];
        },
        error: (error) => {
          console.error('Error adding favorite:', error);
        }
      });
    }
  }
}