import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting , HttpTestingController } from '@angular/common/http/testing';

import { AnimalService, Animal } from './animal.service';

describe('AnimalService', () => {
  let service: AnimalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideHttpClientTesting()],
      providers: [AnimalService]
    });

    service = TestBed.inject(AnimalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAnimals should return an array of animals', () => {
    const mockAnimals: Animal[] = [
      { name: 'Doggo', age: 3, species: 'Dog', breed: 'Labrador', description: '', health: '', story: '', likedBy: [], imageUrl: '' }
    ];

    service.getAnimals().subscribe((animals) => {
      expect(animals.length).toBe(1);
      expect(animals[0].name).toBe('Doggo');
    });

    const req = httpMock.expectOne('http://localhost:5000/api/animals');
    expect(req.request.method).toBe('GET');
    req.flush(mockAnimals);
  });
});
