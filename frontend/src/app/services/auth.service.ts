// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth'; 
  private _currentUser: any = null;

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('user');
    if (saved) this._currentUser = JSON.parse(saved);
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, {
      name,
      email,
      password
    });
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string; user: any }>(`${this.baseUrl}/login`, {
      email,
      password
    }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._currentUser = res.user;
      })
    );
  }

  get currentUser() {
    return this._currentUser;
  }

  getRole(): string {
    return this._currentUser?.role || 'guest';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this._currentUser = null;
  }
  changePassword(currentPassword: string, newPassword: string, token: string) {
    return this.http.put(`${this.baseUrl}/change-password`, 
      { currentPassword, newPassword }, 
      { headers: { Authorization: `Bearer ${token}` } }
      
    );
  }
}
