import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent {
  @Output() clientUpdated = new EventEmitter<any>();
  isOpen = false;
  clientForm: FormGroup;
  private clientId: string | null = null;

  constructor(private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      address: ['']
    });
  }

  /**
   * Abre o modal e preenche o formulário com os dados do cliente.
   * @param client O objeto do cliente a ser editado.
   */
  open(client: any): void {
    this.isOpen = true;
    this.clientId = client.id;
    // Preenche o formulário com os dados do cliente
    this.clientForm.patchValue({
      name: client.name,
      email: client.email,
      phone: client.phone,
      address: client.address
    });
  }

  /**
   * Fecha o modal e limpa o formulário.
   */
  close(): void {
    this.isOpen = false;
    this.clientForm.reset();
    this.clientId = null;
  }

  onSubmit(): void {
    if (this.clientForm.valid && this.clientId) {
      // Emite um objeto contendo o ID e os dados atualizados do formulário
      this.clientUpdated.emit({ id: this.clientId, ...this.clientForm.value });
      this.close();
    }
  }
}
