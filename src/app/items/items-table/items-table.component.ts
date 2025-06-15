import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForOf, NgIf, CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-items-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './items-table.component.html',
  styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent {
  @Input() data: any[] = [];
  @Output() onDeleteProduct = new EventEmitter<string>();
  @Output() onEditProduct = new EventEmitter<any>();

  constructor() {}

  editProduct(product: any): void {
    this.onEditProduct.emit(product);
  }

  deleteProduct(productId: string): void {
    this.onDeleteProduct.emit(productId);
  }
}
