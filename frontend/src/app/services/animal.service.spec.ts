import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { Animal, AnimalService } from './animal.service';

describe('AnimalService', () => {
  let service: AnimalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalService,
        provideHttpClient(withFetch()),
        provideHttpClientTesting()   
      ]
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
  {
    _id: '123',
    name: 'Cirmi',
    age: 2,
    species: 'Cat',
    breed: 'European',
    description: 'Friendly',
    health:"Good",
    story:"no",
    likedBy:[],
    imageUrl: 'test.jpg'
  }
];

    service.getAnimals().subscribe(animals => {
      expect(animals).toEqual(mockAnimals);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/animals');
    expect(req.request.method).toBe('GET');
    req.flush(mockAnimals);
  });
});
