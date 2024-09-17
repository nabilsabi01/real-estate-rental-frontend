import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/user-role.enum';
import { inject } from '@angular/core';
import { AuthService } from './core/services/auth.service';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
        canActivate: [() => inject(AuthService).isLoggedIn() ? false : true]
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent),
        canActivate: [() => inject(AuthService).isLoggedIn() ? false : true]
      }
    ]
  },
  {
    path: 'host',
    canActivate: [authGuard, roleGuard([UserRole.HOST])],
    canActivateChild: [authGuard, roleGuard([UserRole.HOST])],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/host-dashboard/host-dashboard.component').then(m => m.HostDashboardComponent)
      },
    ]
  },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  // { path: '**', loadComponent: () => import('./features/not-found/not-found.component').then(m => m.NotFoundComponent) }
];