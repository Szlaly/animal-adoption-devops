import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AnimalDetailComponent } from './animal-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
describe('AnimalDetailComponent', () => {
  let component: AnimalDetailComponent;
  let fixture: ComponentFixture<AnimalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalDetailComponent],
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

    fixture = TestBed.createComponent(AnimalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
