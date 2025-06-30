import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isBrowser: boolean;

  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: object, private snackBar: MatSnackBar) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('jwt', token);
    }
  }

  getToken(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('jwt');
    }
    return null;
  }
  setOwnerId(id: string): void {
    if (this.isBrowser) {
      localStorage.setItem('ownerId', id);
    }
  }

  getOwnerId(): string | null {
    if (this.isBrowser) {
      return localStorage.getItem('ownerId');
    }
    return null;
  }
  
  isAuthenticated(): boolean {
    if (this.isBrowser) {
      const token = this.getToken();
      return !!token;
    }
    return false;
  }

  logout() {
    if (this.isBrowser) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('ownerId');
    }

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
