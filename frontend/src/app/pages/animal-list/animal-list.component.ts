
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-animal-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  animals: Animal[] = [];

  constructor(
    private animalService: AnimalService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.animalService.getAnimals().subscribe({
      next: (data) => {
        this.animals = data;
      },
      error: (err) => {
        console.error('Állatok betöltése sikertelen:', err);
      }
    });
  }

  goToAddAnimal() {
    this.router.navigate(['/animals/new']);
  }
  deleteAnimal(animalId: string) {
  if (confirm('Biztosan törölni szeretnéd ezt az állatot?')) {
    this.animalService.deleteAnimal(animalId).subscribe({
      next: () => {
        this.animals = this.animals.filter(a => a._id !== animalId);
      },
      error: (err) => {
        console.error('Hiba történt a törlés során:', err);
      }
    });
  }
}

}
