import {Component, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../../items/search-bar/search-bar.component";
import {IconBtnComponent} from '../../items/icon-btn/icon-btn.component';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from '../../auth.service';
import {AddSaleComponent} from '../../items/popups/add-sale/add-sale.component';
import {SalesTableComponent} from '../../items/sales-table/sales-table.component';

@Component({
  selector: 'app-sales',
  imports: [
    IconBtnComponent,
    SearchBarComponent,
    AddSaleComponent,
    SalesTableComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})

export class SalesComponent {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  sales: any[] = [];
  urlAPISales: string = 'http://localhost:5000/api/inventory/sales/';
  urlRegisterSales: string = 'http://localhost:8080/api/v1/sales/register';
  urlGetAll: string = 'http://localhost:8080/api/v1/sales/';

  @ViewChild('salesModal') saleModal!: AddSaleComponent;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    // this.http.get<any[]>(this.urlGetAll + this.authService.getOwnerId()).subscribe({
    //   // this.http.get<any[]>(`${this.urlAPIProducts}`, { withCredentials: true }).subscribe({
    //   next: (data) => {
    //     this.sales = data;
    //     console.log('Vendas carregadas:', data);
    //   },
    //   error: (err) => {
    //     console.error('Erro ao carregar vendas:', err);
    //     this.snackBar.open('Erro ao carregar vendas', 'Fechar', {
    //       duration: 2000,
    //       panelClass: ['error-snackbar']
    //     });
    //   }
    // });
  }

  openPopup() {
    this.saleModal.open();
  }

  handleSaleAdded(event: { sale: any; }): void {
    const { sale } = event;
    //
    // const formData = new FormData();
    //
    // product.ownerId = this.authService.getOwnerId();
    // formData.append('product', new Blob([JSON.stringify(product)], { type: 'application/json' }));
    //
    // if (file) {
    //   formData.append('image', file);
    // }
    //
    // // Enviando o FormData via POST para o backend
    // this.http.post(this.urlRegister, formData).subscribe({
    //   // this.http.post(this.urlAPIProducts, formData).subscribe({
    //   next: (response) => {
    //     console.log('Produto enviado com sucesso:', response);
    //     this.products.push(product); // Adicionando o produto à lista
    //     this.snackBar.open(`${product.name} cadastrado!`, 'Fechar', {
    //       duration: 1000, // 1 segundo
    //       horizontalPosition: 'right',
    //       verticalPosition: 'top',
    //       panelClass: ['success-snackbar']
    //     });
    //   },
    //   error: (error) => {
    //     console.log('Erro ao cadastrar produto:', error);
    //     this.snackBar.open('Erro ao cadastrar produto', 'Fechar', {
    //       duration: 1000,
    //       panelClass: ['error-snackbar']
    //     });
    //   },
    // });
  }

}

