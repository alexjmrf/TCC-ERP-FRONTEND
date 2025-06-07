import {Component, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../../items/search-bar/search-bar.component";
import {IconBtnComponent} from '../../items/icon-btn/icon-btn.component';
import {ItemsTableComponent} from '../../items/items-table/items-table.component';
import {AddProductComponent} from '../../items/popups/add-product/add-product.component';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../auth.service';


@Component({
  selector: 'app-products',
  imports: [
    SearchBarComponent,
    IconBtnComponent,
    ItemsTableComponent,
    AddProductComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  products: any[] = [];
  urlAPIProducts: string = 'http://localhost:5000/api/inventory/products/';

  @ViewChild('productModal') productModal!: AddProductComponent;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {

    this.http.get<any[]>(`${this.urlAPIProducts}`, { withCredentials: true }).subscribe({
      next: (data) => {
        this.products = data;
        console.log('Produtos carregados:', data);
      },
      error: (err) => {
        console.error('Erro ao carregar produtos:', err);
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openPopup() {
    this.productModal.open();
  }

  handleProductAdded(event: { product: any; file: File | null }): void {
    const { product, file } = event;

    const formData = new FormData();

    formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    product.ownerId = this.authService.getOwnerId();

    if (file) {
      formData.append('file', file);
    }

    // Enviando o FormData via POST para o backend
    this.http.post(this.urlAPIProducts, formData).subscribe({
      next: (response) => {
        console.log('Produto enviado com sucesso:', response);
        this.products.push(product); // Adicionando o produto à lista
        this.snackBar.open(`${product.name} cadastrado!`, 'Fechar', {
          duration: 1000, // 1 segundo
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
      },
      error: (error) => {
        console.log('Erro ao cadastrar produto:', error);
        this.snackBar.open('Erro ao cadastrar produto', 'Fechar', {
          duration: 1000,
          panelClass: ['error-snackbar']
        });
      },
    });
  }

}
