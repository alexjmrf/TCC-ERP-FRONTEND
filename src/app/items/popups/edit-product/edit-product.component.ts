import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  @Output() productUpdated = new EventEmitter<any>();
  isOpen = false;
  productForm: FormGroup;
  private productId: string | null = null;
  protected currentProductPhoto: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      profit: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
    });
  }

  open(product: any): void {
    this.isOpen = true;
    this.productId = product.id;
    this.currentProductPhoto = product.photo;
    this.selectedFile = null;

    this.productForm.patchValue({
      name: product.name,
      code: product.code,
      category: product.category,
      price: product.price,
      profit: product.profit,
      quantity: product.quantity
    });
  }

  close(): void {
    this.isOpen = false;
    this.productForm.reset();
    this.productId = null;
    this.currentProductPhoto = null;
    this.selectedFile = null;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (this.productForm.valid && this.productId) {
      const formValue = this.productForm.value;
      const updatePayload: any = {
        id: this.productId,
        name: formValue.name,
        code: formValue.code,
        category: formValue.category,
        price: formValue.price,
        profit: formValue.profit,
        quantity: formValue.quantity,
      };

      this.productUpdated.emit({ product: updatePayload, file: this.selectedFile });
      this.close();
    }
  }
}
