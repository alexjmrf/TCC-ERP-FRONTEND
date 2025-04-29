import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/Auth'; // URL deve vir do arquivo environment
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser') || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData)
      .pipe(
        tap(user => {
          // armazena os detalhes do usuário e o token JWT no localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove o usuário do armazenamento local e do BehaviorSubject
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  // Verifica se o usuário está autenticado
  isAuthenticated(): boolean {
    const user = this.currentUserValue;
    return !!user && !!user.token;
  }

  // Obtém o token JWT
  getToken(): string | null {
    const user = this.currentUserValue;
    return user?.token || null;
  }
}