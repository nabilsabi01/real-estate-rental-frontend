import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  features = [
    { icon: 'fa-check', text: 'Verified properties' },
    { icon: 'fa-headset', text: '24/7 customer support' },
    { icon: 'fa-tag', text: 'Best price guarantee' },
    { icon: 'fa-calendar-alt', text: 'Flexible cancellation options' }
  ];
}
