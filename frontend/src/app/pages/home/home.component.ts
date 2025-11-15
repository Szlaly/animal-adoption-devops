import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private auth = inject(AuthService);
  private router = inject(Router);
  private animalService = inject(AnimalService);

  animals: any[] = [];

  get user() {
    return this.auth.currentUser;
  }

  ngOnInit(): void {
    this.animalService.getAnimals().subscribe({
      next: (data) => this.animals = data,
      error: (err) => console.error('Hiba az állatok lekérésekor:', err)
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
    location.reload();
  }

  viewDetails(id: string) {
    this.router.navigate(['/animals', id]);
  }
}
