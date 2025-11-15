import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AnimalService, Animal } from '../../services/animal.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatIconModule, MatFormFieldModule],
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.scss']
})
export class AddAnimalComponent {
  animal: Animal = {
    name: '',
    age: 0,
    species: '',
    breed: '',
    description: '',
    health: '',
    story: '',
    likedBy: [],
    imageUrl: ''
    
  };
  selectedFile: File | null = null;


  constructor(private animalService: AnimalService, private router: Router) {}

  submitAnimal() {
  const token = localStorage.getItem('token'); 
  if (!token) {
    console.error('Token nem található');
    return;
  }

  const formData = new FormData();
  formData.append('name', this.animal.name);
  formData.append('age', this.animal.age.toString());
  formData.append('species', this.animal.species);
  formData.append('breed', this.animal.breed);
  formData.append('description', this.animal.description);
  formData.append('health', this.animal.health);
  formData.append('story', this.animal.story);

  if (this.selectedFile) {
    formData.append('image', this.selectedFile, this.selectedFile.name);
  }

  this.animalService.addAnimalWithImage(formData, token).subscribe({
    next: (newAnimal) => {
      console.log('Állat sikeresen hozzáadva:', newAnimal);
      this.router.navigate(['/animals']);
    },
    error: (err) => {
      console.error('Hiba az állat hozzáadásakor:', err);
      if (err.status === 401) {
        console.log('Hiba: nem vagy autentikálva.');
      }
    }
  });
}

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFile = input.files[0];
  }
}

}
