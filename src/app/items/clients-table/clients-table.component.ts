import { Component, Input } from '@angular/core';
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

  // Define as colunas que você quer exibir na tabela de clientes
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'actions']; // Exemplo de colunas

  constructor() {}

  // Métodos para ações na tabela (editar, excluir, etc.) podem ser adicionados aqui
  editClient(client: any): void {
    console.log('Editar cliente:', client);
    // Implementar lógica de edição
  }

  deleteClient(clientId: string): void {
    console.log('Excluir cliente com ID:', clientId);
    // Implementar lógica de exclusão
  }
}