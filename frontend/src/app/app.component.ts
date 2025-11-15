import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Animal_Adopt_Proj';

  constructor(public authService: AuthService) {}
  
  get navLinks() {
  const user = this.authService.currentUser;
  const isLoggedIn = !!user;
  const isAdmin = user?.role === 'admin';

  return [
    { path: '/', label: 'Főoldal', show: true },
    { path: '/animals', label: 'Állatok', show: true },
    { path: '/login', label: 'Bejelentkezés', show: !isLoggedIn },
    { path: '/register', label: 'Regisztráció', show: !isLoggedIn },
    { path: '/support', label: 'Szupport', show: !isAdmin },
    { path: '/adoption-request', label: 'Örökbefogadási kérelem', show: isLoggedIn && !isAdmin },
    { path: '/admin', label: 'Admin felület', show: isAdmin },
    { path: '/profile', label: 'Profilom', show: isLoggedIn }
  ];
}

  hasPreviousVisible(index: number): boolean {
    return this.navLinks.slice(0, index).some(link => link.show);
  }
}

