import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { AnimalService, Animal } from '../../services/animal.service';
import { AdoptionService, AdoptionRequest } from '../../services/adoption.service';
import { Router, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule,ChangePasswordComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
   showChangePassword = false;
  private authService = inject(AuthService);
  private animalService = inject(AnimalService);
  private adoptionService = inject(AdoptionService);
  private http = inject(HttpClient);
  private router = inject(Router);

  user: any = null;
  favorites: Animal[] = [];
  adoptionRequests: AdoptionRequest[] = [];

  ngOnInit() {
    this.user = this.authService.currentUser;

    const token = localStorage.getItem('token');
    if (token) {
      this.animalService.getFavorites(token).subscribe({
        next: (res) => this.favorites = res.favorites,
        error: (err) => console.error('Nem sikerült lekérni a kedvenceket:', err)
      });

      this.adoptionService.getMyAdoptionRequests(token).subscribe({
        next: (res) => this.adoptionRequests = res,
        error: (err) => console.error('Nem sikerült lekérni az örökbefogadási kérelmeket:', err)
      });
    }
  }
  confirmDelete() {
  if (confirm('Biztosan törölni szeretnéd a fiókodat? Ez nem visszavonható!')) {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http.delete('http://localhost:5000/api/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.logout();
        this.router.navigate(['/']);
        alert('Fiókod törlésre került.');
      },
      error: (err) => {
        console.error('Hiba a törlés során:', err);
        alert('Nem sikerült törölni a fiókot.');
      }
    });
  }
}

}
