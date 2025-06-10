import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf, NgFor, CommonModule } from '@angular/common';


import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SaleItem {
  productId: string;
  quantity: number;
  productName?: string;
  productPrice: number;
}

interface Employee {
  id: string;
  name: string;
}

interface Client {
  id: string;
  name: string;
}

@Component({
  selector: 'app-add-sale',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgFor,
    CommonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule
  ],
  templateUrl: './add-sale.component.html',
  styleUrl: './add-sale.component.scss'
})
export class AddSaleComponent implements OnInit {
  isVisible = false;
  @Output() saleAdded = new EventEmitter<{ sale: any }>();

  sale = {
    id: '',
    employee: '',
    client: '',
    value: 0,
    products: [] as SaleItem[]
  };

  selectedProductId: string | null = null;
  selectedProductQuantity: number = 1;

  employees: Employee[] = [
    { id: 'emp001', name: 'Chico' },
    { id: 'emp002', name: 'Cláudio' },
    { id: 'emp003', name: 'Marcos' }
  ];

  clients: Client[] = [
    { id: 'cli001', name: 'Fernanda' },
    { id: 'cli002', name: 'Maurício' },
    { id: 'cli003', name: 'César' }
  ];

  availableProducts: Product[] = [
    { id: '001', name: 'Bola de Futebol', price: 10, quantity: 2},
    { id: '002', name: 'Carrinho', price: 15, quantity: 1},
    { id: '003', name: 'Espada de Plástico', price: 5, quantity: 4}
  ];

  private readonly API_BASE_URL = 'http://localhost:8080/api/v1';
  private readonly EMPLOYEES_API_URL = `${this.API_BASE_URL}/employees`;
  private readonly CLIENTS_API_URL = `${this.API_BASE_URL}/clients`;
  private readonly PRODUCTS_API_URL = `${this.API_BASE_URL}/products`;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
  }

  open() {
    this.isVisible = true;
    this.loadData();
  }

  close() {
    this.isVisible = false;
    this.resetForm();
  }

  private loadData(): void {
    // this.http.get<any[]>(this.EMPLOYEES_API_URL).subscribe({
    //   next: (data) => this.employees = data,
    //   error: (err) => console.error('Erro ao carregar funcionários:', err)
    // });
    //
    // this.http.get<any[]>(this.CLIENTS_API_URL).subscribe({
    //   next: (data) => this.clients = data,
    //   error: (err) => console.error('Erro ao carregar clientes:', err)
    // });
    //
    // this.http.get<Product[]>(this.PRODUCTS_API_URL).subscribe({
    //   next: (data) => this.availableProducts = data,
    //   error: (err) => console.error('Erro ao carregar produtos:', err)
    // });
  }


  addProductToSale(): void {
    if (!this.selectedProductId || this.selectedProductQuantity <= 0) {
      this.snackBar.open('Selecione um produto e uma quantidade válida.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    const productToAdd = this.availableProducts.find(
      (p) => p.id === this.selectedProductId
    );

    if (!productToAdd) {
      this.snackBar.open('Produto selecionado não encontrado.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    const availableStock = productToAdd.quantity;
    let newQuantityInSale = this.selectedProductQuantity;

    const existingItemIndex = this.sale.products.findIndex(item => item.productId === productToAdd.id);

    if (existingItemIndex > -1) {
      const existingItem = this.sale.products[existingItemIndex];
      newQuantityInSale = existingItem.quantity + this.selectedProductQuantity; // Quantidade total após a adição
    }

    if (newQuantityInSale > availableStock) {
      this.snackBar.open(
        `Quantidade excede o estoque disponível (${availableStock} unidades).`,
        'Fechar',
        { duration: 4000, panelClass: ['error-snackbar'] }
      );
      return;
    }

    if (existingItemIndex > -1) {
      this.sale.products[existingItemIndex].quantity = newQuantityInSale;
    } else {
      this.sale.products.push({
        productId: productToAdd.id,
        quantity: this.selectedProductQuantity,
        productName: productToAdd.name,
        productPrice: productToAdd.price,
      });
    }

    this.calculateTotalValue();
    this.selectedProductId = null;
    this.selectedProductQuantity = 1;
  }


  removeProductFromSale(index: number): void {
    this.sale.products.splice(index, 1);
    this.calculateTotalValue();
  }


  calculateTotalValue(): void {
    this.sale.value = this.sale.products.reduce((sum, item) => {
      const product = this.availableProducts.find(p => p.id === item.productId);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  onSubmit() {
    if(this.sale.employee.trim().length <= 0){
      this.snackBar.open('Escolha um vendedor.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if(this.sale.client.trim().length <= 0){
      this.snackBar.open('Escolha um cliente.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }

    if (this.sale.products.length === 0) {
      this.snackBar.open('Adicione pelo menos um produto à venda.', 'Fechar', { duration: 3000, panelClass: ['error-snackbar'] });
      return;
    }
    this.saleAdded.emit({ sale: this.sale});
    this.close();
  }

  private resetForm(): void {
    this.sale = {
      id: '',
      employee: '',
      client: '',
      value: 0,
      products: []
    };
    this.selectedProductId = null;
    this.selectedProductQuantity = 1;
  }
}
