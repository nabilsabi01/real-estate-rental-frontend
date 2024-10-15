import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user-role.enum';

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
  mobileMenuActive: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isGuest(): boolean {
    return this.isLoggedIn() && this.authService.getUserRole() === UserRole.GUEST;
  }

  toggleMobileMenu() {
    this.mobileMenuActive = !this.mobileMenuActive;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}