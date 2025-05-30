import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../auth.service'; //
import { SearchBarComponent } from "../../items/search-bar/search-bar.component"; //
import { IconBtnComponent } from '../../items/icon-btn/icon-btn.component'; //
import { ClientsTableComponent } from '../../items/clients-table/clients-table.component'; //  Componente específico para clientes
import { AddClientComponent } from '../../items/popups/add-client/add-client.component'; // Popup para adicionar cliente
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    SearchBarComponent,
    IconBtnComponent,
    ClientsTableComponent,
    AddClientComponent,
    CommonModule
  ],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  clients: any[] = [];
  // TODO: Ajustar as URLs para funcionar independente do ambiente
  private readonly urlAPICustomers = 'http://localhost:5002/api/customers/';

  @ViewChild('clientModal') clientModal!: AddClientComponent;

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.http.get<any[]>(`${this.urlAPICustomers}`, { withCredentials: true }).subscribe({
      next: (data) => {
        this.clients = data;
        console.log('Clientes carregados:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar clientes:', err);
        this.snackBar.open('Erro ao carregar clientes', 'Fechar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openAddClientPopup(): void {
    this.clientModal.open();
  }

  handleClientAdded(event: { client: any; file: File | null }): void {
    const { client } = event;
    const ownerId = this.authService.getOwnerId();

    if (!ownerId) {
      this.snackBar.open('ID do usuário não encontrado. Não é possível adicionar cliente.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    const clientPayload = {
      ...client,
    };

    this.http.post(this.urlAPICustomers, clientPayload).subscribe({
      next: (response: any) => {
        console.log('Cliente adicionado com sucesso:', response);
        this.clients.push(response);
        this.snackBar.open(`Cliente ${clientPayload.name} adicionado!`, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.loadClients();
      },
      error: (error) => {
        console.error('Erro ao adicionar cliente:', error);
        const errorMessage = error.error?.detail || error.error?.msg || (typeof error.error === 'string' && error.error.includes("DOCTYPE html") ? 'Erro no servidor (verifique o console do backend)' : 'Erro ao adicionar cliente.');
        this.snackBar.open(errorMessage, 'Fechar', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }
}