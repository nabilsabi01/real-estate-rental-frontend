import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

import { HeroComponent } from "./hero/hero.component";
import { PropertyTypesComponent } from "./property-types/property-types.component";
import { AboutComponent } from "./about/about.component";
import { TestimonialsComponent } from "./testimonials/testimonials.component";
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { PopularDestinationsComponent } from "./popular-destinations/popular-destinations.component";
import { FeaturedPropertiesComponent } from './featured-properties/featured-properties.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    ButtonModule,
    RippleModule,
    HeaderComponent,
    HeroComponent,
    PropertyTypesComponent,
    FeaturedPropertiesComponent,
    AboutComponent,
    TestimonialsComponent,
    FooterComponent,
    PopularDestinationsComponent
  ],
  providers: [MessageService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isScrolled = false;
  currentSection = 'home';

  constructor(private messageService: MessageService) {}

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 50;
    this.updateCurrentSection();
  }

  updateCurrentSection() {
    const sections = ['home', 'property-types', 'featured-properties', 'about', 'testimonials'];
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          this.currentSection = section;
          break;
        }
      }
    }
  }
}