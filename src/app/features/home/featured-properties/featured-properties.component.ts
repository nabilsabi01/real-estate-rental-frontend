import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PropertyService } from "../../../core/services/property.service";
import { Property } from "../../../core/models/property.model";
import { Subscription, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css'],
  providers: [PropertyService]
})
export class FeaturedPropertiesComponent implements OnInit, OnDestroy {
  featuredProperties: Property[] = [];
  activeImageIndex: number[] = [];
  isLoading: boolean = true;
  error: string | null = null;
  private imageIntervals: Subject<void>[] = [];
  private destroy$ = new Subject<void>();

  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    this.loadFeaturedProperties();
  }

  ngOnDestroy(): void {
    this.stopAllImageRotations();
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFeaturedProperties(): void {
    this.isLoading = true;
    this.error = null;
    this.propertyService.getFeaturedProperties().subscribe({
      next: (properties: Property[]) => {
        this.featuredProperties = properties;
        this.activeImageIndex = new Array(properties.length).fill(0);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching featured properties:', error);
        this.error = 'Failed to load featured properties. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  toggleFavorite(property: Property, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.propertyService.toggleFavorite(property.id).subscribe({
      next: () => {
        property.isFavorited = !property.isFavorited;
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
      }
    });
  }

  prevImage(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const currentProperty = this.featuredProperties[index];
    this.activeImageIndex[index] = (this.activeImageIndex[index] - 1 + currentProperty.photos.length) % currentProperty.photos.length;
  }

  nextImage(index: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const currentProperty = this.featuredProperties[index];
    this.activeImageIndex[index] = (this.activeImageIndex[index] + 1) % currentProperty.photos.length;
  }

  startImageRotation(index: number): void {
    this.stopImageRotation(index);
    this.imageIntervals[index] = new Subject<void>();
    interval(3000)
      .pipe(takeUntil(this.imageIntervals[index]))
      .subscribe(() => {
        this.activeImageIndex[index] = (this.activeImageIndex[index] + 1) % this.featuredProperties[index].photos.length;
      });
  }

  stopImageRotation(index: number): void {
    if (this.imageIntervals[index]) {
      this.imageIntervals[index].next();
      this.imageIntervals[index].complete();
    }
  }

  stopAllImageRotations(): void {
    this.imageIntervals.forEach((interval) => {
      if (interval) {
        interval.next();
        interval.complete();
      }
    });
    this.imageIntervals = [];
  }
}