import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    CommonModule
  ],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'] // Mantém o SCSS existente
})
export class AddEmployeeComponent {
  isVisible = false;
  // O evento agora emite apenas o objeto 'employee'
  @Output() employeeAdded = new EventEmitter<{ employee: any }>();

  employee = {
    name: '',
    email: '',
    phone: '',
    address: '', // Novo campo
    role: '',
    salary: null as number | null, // Novo campo, inicializado como null
    hiredate: '', // Novo campo (substitui admissionDate para corresponder à API)
    status: ''     // Novo campo
  };

  // selectedFile não é mais necessário aqui para um payload JSON simples
  // selectedFile: File | null = null;

  constructor(private snackBar: MatSnackBar) {}

  open(): void {
    this.isVisible = true;
    this.resetForm(); // Garante que o formulário esteja limpo ao abrir
  }

  close(): void {
    this.isVisible = false;
    // Não é necessário chamar resetForm aqui explicitamente se já é chamado no open e no onSubmit bem-sucedido
  }

  onSubmit(form: NgForm): void {
    if (form.invalid) {
      this.snackBar.open('Por favor, preencha todos os campos obrigatórios.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }
    // Emite apenas o objeto 'employee'
    this.employeeAdded.emit({ employee: this.employee });
    this.close(); // Fecha o modal
    // this.resetForm(); // Opcional: resetar aqui ou garantir que 'open' sempre resete
  }

  private resetForm(): void {
    this.employee = {
      name: '',
      email: '',
      phone: '',
      address: '',
      role: '',
      salary: null,
      hiredate: '',
      status: ''
    };
    // this.selectedFile = null; // Não mais necessário
    // Se você tiver uma referência ao NgForm, pode usar form.resetForm(this.employee) para resetar para os valores iniciais
  }
}