import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SearchBarComponent} from "../../../shared/components/search-bar/search-bar.component";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, SearchBarComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  heroBackgroundImage = 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80';

  onSearch(searchData: any) {
    console.log('Search data:', searchData);
  }
}
