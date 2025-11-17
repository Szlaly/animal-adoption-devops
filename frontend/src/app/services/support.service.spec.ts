import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SupportService } from './support.service';

describe('SupportService', () => {
  let service: SupportService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [
            SupportService,          
            provideHttpClient(withFetch()) 
          ]});
    service = TestBed.inject(SupportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
