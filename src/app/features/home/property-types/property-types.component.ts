import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PropertyType } from "../../../core/models/property-type.enum";
import { PropertyService } from "../../../core/services/property.service";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-property-types',
  standalone: true,
  templateUrl: './property-types.component.html',
  imports: [
    NgForOf
  ],
  styleUrls: ['./property-types.component.css']
})
export class PropertyTypesComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  propertyTypes: PropertyType[] = [];

  constructor(public propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyTypes = this.propertyService.getPropertyTypes();
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
