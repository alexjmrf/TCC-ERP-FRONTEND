import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  isVisible = false;
  @Output() productAdded = new EventEmitter<{ product: any, file: File | null }>();

  product = {
    name: '',
    code: '',
    category: '',
    price: 0,
    profit: 0,
    quantity: 0,
  };

  selectedFile: File | null = null;

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.productAdded.emit({ product: this.product, file: this.selectedFile });
    this.resetForm();
    this.close();
  }

  private resetForm(): void {
    this.product = {
      name: '',
      code: '',
      category: '',
      price: 0,
      profit: 0,
      quantity: 0,
    };
    this.selectedFile = null;
  }
}