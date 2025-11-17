import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AdoptionRequestComponent } from './adoption-request.component';

describe('AdoptionRequestComponent', () => {
  let component: AdoptionRequestComponent;
  let fixture: ComponentFixture<AdoptionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdoptionRequestComponent],
       providers: [
      provideHttpClient() 
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
