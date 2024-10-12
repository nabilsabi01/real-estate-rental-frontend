import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Property } from '../../../core/models/property.model';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {
  @Input() property!: Property;
  @Input() isFavorite?: boolean = false;
  @Output() favoriteToggle = new EventEmitter<Property>();

  activeImageIndex: number = 0;
  loadedImages: boolean[] = [];

  ngOnInit() {
    this.loadedImages = new Array(this.property.photos.length).fill(false);
    this.preloadImages();
  }

  preloadImages() {
    this.property.photos.forEach((photo, index) => {
      const img = new Image();
      img.onload = () => {
        this.loadedImages[index] = true;
      };
      img.src = photo.photoUrl;
    });
  }

  toggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoriteToggle.emit(this.property);
  }

  prevImage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeImageIndex = (this.activeImageIndex - 1 + this.property.photos.length) % this.property.photos.length;
  }

  nextImage(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.activeImageIndex = (this.activeImageIndex + 1) % this.property.photos.length;
  }
}