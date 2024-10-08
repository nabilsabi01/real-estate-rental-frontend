import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user-role.enum';

export const roleGuard = (allowedRoles: UserRole[]): CanActivateFn => {
  return (_, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const userRole = authService.getUserRole();

    if (authService.isLoggedIn() && userRole && allowedRoles.includes(userRole)) {
      return true;
    }

    if (!authService.isLoggedIn()) {
      return router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
    } else {
      return router.navigate(['/auth/login']);
    }
  };
};
