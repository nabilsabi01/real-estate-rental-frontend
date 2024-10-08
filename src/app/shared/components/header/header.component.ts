import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() isScrolled!: boolean;
  @Input() currentSection!: string;

  constructor(private authService: AuthService,){

  }

  isLogging(): Boolean{
    return this.authService.isLoggedIn();
  }
}
