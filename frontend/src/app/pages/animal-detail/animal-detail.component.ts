import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../services/animal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-animal-detail',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.scss']
})
export class AnimalDetailComponent {
  private route = inject(ActivatedRoute);
  private animalService = inject(AnimalService);
  private authService = inject(AuthService);
  private router = inject(Router);

  animal: any = null;
  token: string | null = null;
  isFavorite: boolean = false;
  isAdmin: boolean = false; 
  showUpdateBox = false;
  newUpdateText = '';

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.token = localStorage.getItem('token');

    if (id) {
      this.animalService.getAnimalById(id).subscribe({
        next: (data) => {
          this.animal = data;
          this.checkIfFavorite();
          this.checkIfAdmin();  
        },
        error: (err) => console.error('Hiba állat lekérdezésénél:', err)
      });
    }
  }

  checkIfFavorite() {
    if (!this.token || !this.animal?._id) return;

    this.animalService.getFavorites(this.token).subscribe({
      next: (res) => {
        const favorites = res.favorites.map((fav: any) => fav._id);
        this.isFavorite = favorites.includes(this.animal._id);
      },
      error: (err) => console.error('Kedvencek lekérdezési hiba:', err)
    });
  }

  toggleFavorite() {
    if (!this.token || !this.animal?._id) return;

    if (this.isFavorite) {
      this.animalService.removeFromFavorites(this.animal._id, this.token).subscribe({
        next: () => {
          this.isFavorite = false;
        },
        error: (err) => console.error('Nem sikerült eltávolítani a kedvencekből:', err)
      });
    } else {
      this.animalService.addToFavorites(this.animal._id, this.token).subscribe({
        next: () => {
          this.isFavorite = true;
        },
        error: (err) => console.error('Nem sikerült hozzáadni a kedvencekhez:', err)
      });
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  checkIfAdmin() {
    this.isAdmin = this.authService.isAdmin(); 
  }

  editAnimal() {
    if (this.isAdmin) {
      this.router.navigate(['/animals/edit', this.animal._id]);
    } else {
      console.error('Admin jogosultság szükséges a szerkesztéshez.');
    }
  }
  toggleUpdateBox() {
  this.showUpdateBox = !this.showUpdateBox;
}

submitUpdate() {
  if (!this.animal?._id || !this.newUpdateText.trim()) return;

  this.animalService.addUpdateToAnimal(this.animal._id, this.newUpdateText).subscribe({
    next: (updatedAnimal) => {
      this.animal = updatedAnimal;
      this.newUpdateText = '';
      this.showUpdateBox = false;
    },
    error: (err) => console.error('Hiba a frissítés elküldésekor:', err)
  });
}

}
