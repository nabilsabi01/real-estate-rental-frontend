import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {
  searchData = {
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  };

  constructor(private router: Router) {}

  onSearch() {
    const formattedCheckIn = this.searchData.checkIn ? new Date(this.searchData.checkIn).toISOString() : null;
    const formattedCheckOut = this.searchData.checkOut ? new Date(this.searchData.checkOut).toISOString() : null;

    this.router.navigate(['/search-results'], {
      queryParams: {
        destination: this.searchData.destination,
        checkIn: formattedCheckIn,
        checkOut: formattedCheckOut,
        guests: this.searchData.guests
      }
    });
  }
}