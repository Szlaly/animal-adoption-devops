import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { AdoptionService } from './adoption.service';

describe('AdoptionService', () => {
  let service: AdoptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
            AdoptionService,          
            provideHttpClient(withFetch()) 
          ]});
    service = TestBed.inject(AdoptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
