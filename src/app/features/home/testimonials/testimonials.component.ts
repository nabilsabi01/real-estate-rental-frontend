import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="testimonial" id="testimonials">
      <div class="container">
        <h2 class="section-title">Testimonials</h2>
        <div class="testimonial-carousel" [@slideAnimation]="currentIndex">
          <div class="testimonial-slider" [style.transform]="'translateX(' + (-currentIndex * 33.33) + '%)'">
            <div *ngFor="let testimonial of testimonials" class="testimonial-card">
              <img [src]="testimonial.image" [alt]="testimonial.name" class="testimonial-image">
              <h3 class="testimonial-name">{{ testimonial.name }}</h3>
              <p class="testimonial-profession">{{ testimonial.profession }}</p>
              <div class="testimonial-rating">
                <span *ngFor="let star of [1, 2, 3, 4, 5]" 
                      class="star" 
                      [class.active]="star <= testimonial.rating">★</span>
              </div>
              <p class="testimonial-text">{{ testimonial.content }}</p>
            </div>
          </div>
        </div>
        <div class="testimonial-controls">
          <button (click)="prevTestimonial()" class="nav-button" aria-label="Previous testimonials">
            <span class="arrow left"></span>
          </button>
          <div class="testimonial-indicators">
            <button *ngFor="let _ of slideIndices; let i = index" 
                    (click)="setTestimonial(i)" 
                    class="indicator" 
                    [class.active]="i === currentIndex"
                    [attr.aria-label]="'Go to testimonial set ' + (i + 1)">
            </button>
          </div>
          <button (click)="nextTestimonial()" class="nav-button" aria-label="Next testimonials">
            <span class="arrow right"></span>
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .testimonial {
      background-color: var(--background-dark);
      padding: 60px 0;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    .section-title {
      font-size: 32px;
      text-align: left;
      margin-bottom: 40px;
      color: var(--text-light);
    }
    .testimonial-carousel {
      overflow: hidden;
      margin-bottom: 20px;
    }
    .testimonial-slider {
      display: flex;
      transition: transform 0.5s ease;
    }
    .testimonial-card {
      flex: 0 0 calc(33.33% - 20px);
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      margin-right: 20px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .testimonial-image {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      margin-bottom: 15px;
    }
    .testimonial-name {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 5px;
      color: var(--text-dark);
    }
    .testimonial-profession {
      font-size: 14px;
      color: var(--primary-color);
      margin-bottom: 10px;
    }
    .testimonial-rating {
      margin-bottom: 10px;
    }
    .star {
      color: #ddd;
      font-size: 16px;
    }
    .star.active {
      color: var(--primary-color);
    }
    .testimonial-text {
      font-size: 14px;
      line-height: 1.5;
      color: var(--text-dark);
    }
    .testimonial-controls {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .nav-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
    }
    .arrow {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-top: 2px solid var(--text-light);
      border-right: 2px solid var(--text-light);
    }
    .arrow.left {
      transform: rotate(-135deg);
    }
    .arrow.right {
      transform: rotate(45deg);
    }
    .testimonial-indicators {
      display: flex;
      justify-content: center;
      margin: 0 20px;
    }
    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #555;
      border: none;
      margin: 0 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }
    .indicator.active {
      background-color: var(--primary-color);
    }
    @media (max-width: 992px) {
      .testimonial-card {
        flex: 0 0 calc(50% - 20px);
      }
    }
    @media (max-width: 768px) {
      .testimonial-card {
        flex: 0 0 calc(100% - 20px);
      }
    }
  `],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX({{offset}}%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials = [
    {
      name: 'Sebastian',
      profession: 'Graphic design',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/48cdcfb4f84db98007956af7a19adf86dd0be29da15aefa3e6aab09a67463f79',
      rating: 5
    },
    {
      name: 'Evangeline',
      profession: 'Model',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/e0991943d9f0de0ff3ec983c89fa55afdfb867d6ac9df13880e51da143adaf5f',
      rating: 5
    },
    {
      name: 'Alexander',
      profession: 'Software engineer',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4952d4f0c8c3230948711904cfbee0169418f036a2a1e959e473016b75751a15',
      rating: 5
    },
    {
      name: 'Alexander',
      profession: 'Software engineer',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4952d4f0c8c3230948711904cfbee0169418f036a2a1e959e473016b75751a15',
      rating: 5
    },
    {
      name: 'Alexander',
      profession: 'Software engineer',
      content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text.',
      image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/4952d4f0c8c3230948711904cfbee0169418f036a2a1e959e473016b75751a15',
      rating: 5
    },
    // Add more testimonials here to have more than 3
  ];

  currentIndex = 0;
  slideIndices!: number[];
  private autoRotateInterval: any;

  ngOnInit() {
    this.slideIndices = Array(Math.ceil(this.testimonials.length / 3)).fill(0).map((_, i) => i);
    this.startAutoRotate();
  }

  ngOnDestroy() {
    this.stopAutoRotate();
  }

  prevTestimonial() {
    this.currentIndex = (this.currentIndex - 1 + this.slideIndices.length) % this.slideIndices.length;
  }

  nextTestimonial() {
    this.currentIndex = (this.currentIndex + 1) % this.slideIndices.length;
  }

  setTestimonial(index: number) {
    this.currentIndex = index;
  }

  private startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      this.nextTestimonial();
    }, 5000);
  }

  private stopAutoRotate() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }
}