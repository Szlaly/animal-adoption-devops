import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AnimalListComponent } from './pages/animal-list/animal-list.component';
import { AnimalDetailComponent } from './pages/animal-detail/animal-detail.component';
import { SupportComponent } from './pages/support/support.component';
import { AddAnimalComponent } from './pages/add-animal/add-animal.component';
import { AdoptionRequestComponent } from './pages/adoption-request/adoption-request.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { AnimalEditComponent } from './pages/edit-animal/edit-animal.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'adoption-request', component: AdoptionRequestComponent }, 
    { path: 'animals', component: AnimalListComponent },
    { path: 'animals/new', component: AddAnimalComponent },
    { path: 'animals/edit/:id', component: AnimalEditComponent },
    { path: 'animals/:id', component: AnimalDetailComponent },
    {
        path: 'profile',
        canActivate: [
            () => {
                const auth = inject(AuthService);
                const router = inject(Router);
                if (auth.currentUser) {
                    return true;
                } else {
                    router.navigate(['/login']);
                    return false;
                }
            }
        ],
        loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent)
    },
    { path: 'support', component: SupportComponent },
    {
  path: 'admin',
  canActivate: [
    () => {
      const auth = inject(AuthService);
      const router = inject(Router);
      const user = auth.currentUser;

      if (user && user.role === 'admin') {
        return true;
      } else {
        router.navigate(['/']); 
        return false;
      }
    }
  ],
  loadComponent: () => import('./pages/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent)
}
];
