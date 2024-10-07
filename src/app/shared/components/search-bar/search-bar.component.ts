import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface SearchData {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<SearchData>();

  searchData: SearchData = {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  };

  onSearch() {
    this.search.emit(this.searchData);
  }
}
