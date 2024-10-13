import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { Property } from "../../core/models/property.model";
import { BookingService } from "../../core/services/booking.service";
import { PropertyService } from "../../core/services/property.service";

@Component({
  selector: "app-property-details",
  templateUrl: "./property-details.component.html",
  styleUrls: ["./property-details.component.css"],
  standalone: true,
  imports: [CommonModule],
})
export class PropertyDetailsComponent implements OnInit {
onShare() {
throw new Error('Method not implemented.');
}
  property: Property | null = null;
  isLoading = true;
  error: string | null = null;
  totalPrice: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService,
    private bookingService: BookingService
  ) {}

  ngOnInit() {
    const propertyId = this.route.snapshot.paramMap.get('id');
    if (propertyId) {
      this.loadPropertyDetails(+propertyId);
    } else {
      this.error = "Property ID not found";
      this.isLoading = false;
    }
  }

  loadPropertyDetails(propertyId: number) {
    this.propertyService.getPropertyById(propertyId).subscribe({
      next: (property) => {
        this.property = property;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = "Failed to load property details";
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  onReserve() {
    if (this.property && this.property.id) {
      // Assuming you have methods to get check-in and check-out dates
      const checkInDate = new Date(); // Replace with actual check-in date
      const checkOutDate = new Date(); // Replace with actual check-out date
      checkOutDate.setDate(checkOutDate.getDate() + 1); // Just for example, setting checkout to next day

      this.bookingService.getBookingPrice(this.property.id, checkInDate, checkOutDate).subscribe({
        next: (price) => {
          this.totalPrice = price;
          // Here you can proceed with the booking process, e.g., navigate to a booking confirmation page
        },
        error: (err) => {
          console.error("Failed to get booking price", err);
          // Handle the error, maybe show a message to the user
        }
      });
    }
  }

  toggleFavorite() {
    if (this.property && this.property.id) {
      // Assuming you have a method to get the current user ID
      const currentUserId = 11; // Replace with actual current user ID
      this.propertyService.toggleFavorite(this.property.id).subscribe({
        next: () => {
          if (this.property) {
            this.property.isFavorited = !this.property.isFavorited;
          }
        },
        error: (err) => {
          console.error("Failed to toggle favorite", err);
          // Handle the error, maybe show a message to the user
        }
      });
    }
  }
}