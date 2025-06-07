import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common'; //

@Component({
  selector: 'app-clients-table',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule
  ],
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent {
  @Input() data: any[] = [];
  @Output() onDeleteClient = new EventEmitter<string>();
  @Output() onEditClient = new EventEmitter<any>();

  // Define as colunas que você quer exibir na tabela de clientes
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions'];

  constructor() {}

  // Métodos para ações na tabela (editar, excluir, etc.) podem ser adicionados aqui
  editClient(client: any): void {
    this.onEditClient.emit(client);
  }

  deleteClient(clientId: string): void {
    this.onDeleteClient.emit(clientId)
  }
}