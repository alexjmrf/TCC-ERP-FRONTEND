import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    HttpClientModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly API_URL = 'http://localhost:8080/api/v1/users/login';

  constructor(
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private UserService: UserService
  ) {}

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      const loginData = {
        email: loginForm.value.email,
        password: loginForm.value.password,
      };

      this.UserService.loginUser(loginData).subscribe({
        next: (response: any) => {
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/home']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao realizar login. Tente novamente.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }
}
