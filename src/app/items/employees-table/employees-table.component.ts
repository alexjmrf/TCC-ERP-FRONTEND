import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgForOf, DatePipe } from '@angular/common'; // DatePipe para formatar hiredate
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [
    NgForOf,
    CommonModule,
    DatePipe, // Importar DatePipe
    MatIconModule
  ],
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'] // Mantém o SCSS existente
})
export class EmployeesTableComponent {
  @Input() data: any[] = [];
  @Output() onDeleteEmployee = new EventEmitter<string>();
  @Output() onEditEmployee = new EventEmitter<any>();

  // Atualiza as colunas para refletir os novos campos da API e do formulário
  // Os nomes aqui devem corresponder às chaves dos objetos no array 'data'
  // que vêm da API de listagem de funcionários.
  displayedColumns: string[] = [
    'name',        // Nome
    'role',        // Cargo
    'email',       // Email
    'phone',       // Telefone
    'address',     // Endereço (Novo)
    'salary',      // Salário (Novo)
    'hiredate',    // Data de Contratação (Antigo admissionDate)
    'status',      // Status (Novo)
    'actions'      // Ações (Editar, Excluir, etc.)
  ];

  constructor() {}

  editEmployee(employee: any): void {
    this.onEditEmployee.emit(employee);
  }

  deleteEmployee(employeeId: string): void {
    this.onDeleteEmployee.emit(employeeId);
  }
}