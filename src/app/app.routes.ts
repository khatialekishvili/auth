import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/layout/layout').then(m => m.Layout),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/landing/landing').then(m => m.Landing)
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products').then(m => m.Products)
      }
    ]
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./register/register').then(m => m.Register)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login').then(m => m.Login)
  }
];