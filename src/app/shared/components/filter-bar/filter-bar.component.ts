import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-filter-bar",
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class FilterBarComponent {
  filters = {
    priceRange: [0, 1000],
    propertyType: '',
    amenities: []
  };

  applyFilters() {
    console.log('Applied filters:', this.filters);
  }
}