import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  isAuthenticated(): boolean {
    if (this.isBrowser) {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('token');
    }
    return null;
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
    }
  }

  getOwnerId(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('ownerId');
    }
    return null;
  }

  setOwnerId(id: string): void {
    if (this.isBrowser) {
      localStorage.setItem('ownerId', id);
    }
  }

  login(token: string, ownerId: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      localStorage.setItem('ownerId', ownerId);
    }
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('ownerId');

      this.router.navigate(['/login']);

      this.snackBar.open('Você foi deslogado com sucesso.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    }
  }
}
