import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AnimalService } from './animal.service';

describe('AnimalService', () => {
  let service: AnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AnimalService,          
        provideHttpClient(withFetch()) 
      ]
    });

    service = TestBed.inject(AnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
