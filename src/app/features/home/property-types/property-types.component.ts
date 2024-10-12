import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyType } from "../../../core/models/property-type.enum";
import { PropertyService } from "../../../core/services/property.service";

@Component({
  selector: 'app-property-types',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './property-types.component.html',
  styleUrls: ['./property-types.component.css']
})
export class PropertyTypesComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef<HTMLElement>;
  propertyTypes: PropertyType[] = [];

  constructor(public propertyService: PropertyService) {}

  ngOnInit(): void {
    this.propertyTypes = this.propertyService.getPropertyTypes();
  }

  ngAfterViewInit() {
    this.initLazyLoading();
  }

  private initLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img['src'] = img.dataset['src'] || '';
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        root: this.scrollContainer.nativeElement,
        rootMargin: '50px 50px 50px 50px',
        threshold: 0.1
      });

      const images = this.scrollContainer.nativeElement.querySelectorAll('.property-type-image.lazy');
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      this.loadAllImages();
    }
  }

  private loadAllImages() {
    const images = this.scrollContainer.nativeElement.querySelectorAll('.property-type-image.lazy');
    images.forEach(img => {
      const imgElement = img as HTMLImageElement;
      imgElement['src'] = imgElement.dataset['src'] || '';
      imgElement.classList.add('loaded');
    });
  }

  scrollLeft(): void {
    this.scrollContainer.nativeElement.scrollBy({ 
      left: -300, 
      behavior: 'smooth' 
    });
  }

  scrollRight(): void {
    this.scrollContainer.nativeElement.scrollBy({ 
      left: 300, 
      behavior: 'smooth' 
    });
  }
}