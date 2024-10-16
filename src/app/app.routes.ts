import { Routes } from '@angular/router';
import {  authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
      },
      {
        path: 'signup',
        loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent)
      }
    ]
  },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'favorites',
    loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent),
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'GUEST' }
  },
  {
    path: 'property/:id',
    loadComponent: () => import('./features/property-details/property-details.component').then(m => m.PropertyDetailsComponent)
  },
  {
    path: 'search-results',
    loadComponent: () => import('./features/search-results/search-results.component').then(m => m.SearchResultsComponent)
  },
  {
    path: 'add-property',
    loadComponent: () => import('./features/property/property-form/property-form.component').then(m => m.PropertyFormComponent),
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'HOST' }
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];