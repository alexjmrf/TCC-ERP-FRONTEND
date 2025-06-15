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
    AddSaleComponent,
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
  clients: any[] = [];
  employees: any[] = [];
  products: any[] = [];
  urlAPISales: string = 'http://localhost:8080/api/sales/';

  @ViewChild('salesModal') saleModal!: AddSaleComponent;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.http.get<any>(`${this.urlAPISales}` + "overview", { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.clients = data.customers;
        this.employees = data.employees;
        this.sales = data.sales;
        this.products = data.products;
      },
      error: (err) => {
        console.error('Erro ao carregar dados:', err);
        this.snackBar.open('Erro ao carregar dados de vendas, clientes e funcionários', 'Fechar', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      }
    });
  }

  openPopup() {
    this.saleModal.open(this.clients, this.employees, this.products);
  }

  handleDeleteSale(saleId: string): void {
    if (confirm('Tem certeza de que deseja excluir esta venda?')) {
      this.http.delete(`${this.urlAPISales}${saleId}`, { withCredentials: true }).subscribe({
        next: () => {
          this.snackBar.open('Venda excluída com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.loadSales();
        },
        error: (error) => {
          console.error('Erro ao excluir venda:', error);
          this.snackBar.open('Erro ao excluir venda.', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
        }
      });
    }
  }
}

