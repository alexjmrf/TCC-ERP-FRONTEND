import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [
    FormsModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private userService: UserService, private snackBar: MatSnackBar) {}

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

  const userData = {
    name: this.name,
    email: this.email,
    password: this.password
  };

  this.userService.registerUser(userData).subscribe({next: (response)=>{
    this.snackBar.open('Usuário registrado com sucesso!', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-success']
    });
    this.router.navigate(['/login']);
  },
  error: (error) => {
    this.snackBar.open('Erro ao registrar usuário. Tente novamente.', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-error']
    });
  }
  });
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
