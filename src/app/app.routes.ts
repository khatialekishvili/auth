import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'register', pathMatch: 'full' },
    { path: 'register', loadComponent: () => import('./register/register').then(m => m.Register) },
    { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
    { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
];
