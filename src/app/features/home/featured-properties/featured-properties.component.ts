import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css']
})
export class FeaturedPropertiesComponent {
  featuredProperties = [
    {
      id: 1,
      name: 'Seaside Villa',
      location: 'Malibu, CA',
      price: 350,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: 'Mountain Chalet',
      location: 'Aspen, CO',
      price: 275,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.6,
      reviews: 98
    },
    {
      id: 3,
      name: 'Downtown Loft',
      location: 'New York, NY',
      price: 200,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.5,
      reviews: 156
    },
    {
      id: 4,
      name: 'Beachfront Condo',
      location: 'Miami, FL',
      price: 180,
      image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
      rating: 4.7,
      reviews: 112
    }
  ];

  getStarArray(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0).map((_, index) => index + 1);
  }
}
