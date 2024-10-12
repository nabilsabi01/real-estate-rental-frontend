import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Destination {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-popular-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popular-destinations.component.html',
  styleUrls: ['./popular-destinations.component.css']
})
export class PopularDestinationsComponent {
  destinations: Destination[] = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      description: 'Tropical paradise with beautiful beaches and rich culture.',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80'
    },
    {
      id: 2,
      name: 'Paris, France',
      description: 'City of lights, romance, and iconic landmarks.',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFyaXN8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    },
    {
      id: 3,
      name: 'New York City, USA',
      description: 'The Big Apple, known for its vibrant culture and skyline.',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3JTIweW9yayUyMGNpdHl8ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    },
    {
      id: 4,
      name: 'Tokyo, Japan',
      description: 'A mix of ultramodern and traditional, with top-notch cuisine.',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    },
    {
      id: 5,
      name: 'Barcelona, Spain',
      description: 'Beautiful architecture, beaches, and Mediterranean charm.',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFyY2Vsb25hfGVufDB8fDB8fHww&w=1000&q=80'
    },
    {
      id: 6,
      name: 'Cape Town, South Africa',
      description: 'Stunning landscapes, diverse wildlife, and rich history.',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FwZSUyMHRvd258ZW58MHx8MHx8fDA%3D&w=1000&q=80'
    }
  ];
}