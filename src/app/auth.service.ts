import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    return !!token; // Retorna true se o token existir
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  setToken(token: string): void {
    localStorage.setItem('jwt', token);
  }

  getOwnerId(): string | null {
    return localStorage.getItem('userId');
  }

  setOwnerId(id: string): void {
    localStorage.setItem('userId', id);
  }

  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');

    this.router.navigate(['/login']);

    this.snackBar.open('Você foi deslogado com sucesso.', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}
