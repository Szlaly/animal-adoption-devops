import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AddAnimalComponent } from './add-animal.component';
describe('AddAnimalComponent', () => {
  let component: AddAnimalComponent;
  let fixture: ComponentFixture<AddAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnimalComponent],
        providers: [
      provideHttpClient() 
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
