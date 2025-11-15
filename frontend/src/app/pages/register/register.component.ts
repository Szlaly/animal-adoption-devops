import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  message = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onRegister(event: Event) {
    event.preventDefault();
    if (this.password !== this.confirmPassword) {
      this.message = 'A két jelszó nem egyezik';
      return;
    }

    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.message = 'Sikeres regisztráció!';
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Hiba történt a regisztráció során';
      }
    });
  }
}
