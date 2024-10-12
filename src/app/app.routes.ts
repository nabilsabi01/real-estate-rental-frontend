import { Routes } from '@angular/router';

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
    loadComponent: () => import('./features/favorites/favorites.component').then(m => m.FavoritesComponent)
  },
  // {
  //   path: 'property/:id',
  //   loadComponent: () => import('./features/property-details/property-details.component').then(m => m.P)
  // },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];
