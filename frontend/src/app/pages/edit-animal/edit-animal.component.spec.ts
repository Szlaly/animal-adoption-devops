import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AnimalEditComponent } from './edit-animal.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
describe('AnimalEditComponent', () => {
  let component: AnimalEditComponent;
  let fixture: ComponentFixture<AnimalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalEditComponent],
       providers: [
      provideHttpClient() ,
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: { paramMap: { get: () => '123' } }, 
          params: of({ id: '123' }) 
        }
      }
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
