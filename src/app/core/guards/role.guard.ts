import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(() => {
      if (!authService.isLoggedIn()) {
        router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }

      const expectedRole = route.data['expectedRole'];
      const userRole = authService.getUserRole();

      if (userRole === expectedRole) {
        return true;
      }

      router.navigate(['/unauthorized']);
      return false;
    })
  );
};