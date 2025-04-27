import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  onRegister() {
    if (!this.name || !this.email || !this.password || !this.confirmPassword) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!this.validateEmail(this.email)) {
      alert('Por favor, informe um e-mail válido.');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }

    this.router.navigate(['/login']);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
