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
  urlAPISalesOverView: string = 'http://localhost:8080/api/sales/overview';

  @ViewChild('salesModal') saleModal!: AddSaleComponent;

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.http.get<any>(`${this.urlAPISalesOverView}`, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.clients = data.customers;
        this.employees = data.employees;
        this.sales = data.sales;
        this.products = data.products;
        console.log('Clientes carregados:', this.clients);
        console.log('Funcionários carregados:', this.employees);
        console.log('Produtos carregados:', this.products);
        console.log('Vendas carregadas:', this.sales);
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
}

