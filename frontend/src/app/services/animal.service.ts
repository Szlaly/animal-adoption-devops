
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Animal {
  _id?: string;
  name: string;
  age: number;
  species: string;
  breed: string;
  description: string;
  health: string;
  story: string;
  likedBy: string[];
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  private baseUrl = 'http://localhost:5000/api/animals';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.baseUrl);
  }
addAnimal(animal: Animal, token: string): Observable<Animal> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); 

    return this.http.post<Animal>(this.baseUrl, animal, { headers });
  }

  getAnimalById(id: string): Observable<Animal> {
    return this.http.get<Animal>(`${this.baseUrl}/${id}`);
  }
addToFavorites(animalId: string, token: string) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`http://localhost:5000/api/users/favorites/${animalId}`, {}, { headers });
}

removeFromFavorites(animalId: string, token: string) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`http://localhost:5000/api/users/favorites/${animalId}`, { headers });
}

getFavorites(token: string) {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<any>(`http://localhost:5000/api/users/favorites`, { headers });
}
updateAnimal(id: string, updatedData: FormData): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
   
  });

  return this.http.put(`${this.baseUrl}/${id}`, updatedData, { headers });
}

deleteAnimal(id: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.delete(`${this.baseUrl}/${id}`, { headers });
}
addAnimalWithImage(formData: FormData, token: string): Observable<Animal> {
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<Animal>(this.baseUrl, formData, { headers });
}
updateAnimalWithImage(id: string, formData: FormData) {
  return this.http.put<Animal>(`${this.baseUrl}/animals/${id}`, formData);
}
addUpdateToAnimal(id: string, text: string): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`${this.baseUrl}/${id}/updates`, { text }, { headers });
}


}
