import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  message = '';

  private authService = inject(AuthService);
  private router = inject(Router);

  onLogin(event: Event) {
    event.preventDefault();

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        
        
        this.message = 'Sikeres bejelentkezés!';
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.message = err.error?.message || 'Hiba történt a bejelentkezés során';
      }
    });
  }
}
