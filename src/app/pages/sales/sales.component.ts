import {Component, ViewChild} from '@angular/core';
import {SearchBarComponent} from "../../items/search-bar/search-bar.component";
import {IconBtnComponent} from '../../items/icon-btn/icon-btn.component';
import { HttpClient } from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar
  ) {}

  sales: any[] = [];
  clients: any[] = [];
  employees: any[] = [];
  products: any[] = [];
  urlAPISales: string = 'http://74.163.204.254/api/sales';
  urlAPICustomers: string = 'http://74.163.204.254/api/customers/';
  urlAPIProducts: string = 'http://74.163.204.254/api/inventory/products/';
  urlAPIEmployees: string = 'http://74.163.204.254/api/employees/';

  @ViewChild('salesModal') saleModal!: AddSaleComponent;

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    const salesPromise = this.http.get<any[]>(this.urlAPISales, { withCredentials: true }).toPromise();
    const clientsPromise = this.http.get<any[]>(this.urlAPICustomers, { withCredentials: true }).toPromise();
    const employeesPromise = this.http.get<any[]>(this.urlAPIEmployees, { withCredentials: true }).toPromise();
    const productsPromise = this.http.get<any[]>(this.urlAPIProducts, { withCredentials: true }).toPromise();

    Promise.all([salesPromise, clientsPromise, employeesPromise, productsPromise])
      .then(([salesData, clientsData, employeesData, productsData]) => {
        this.sales = salesData || [];
        this.clients = clientsData || [];
        this.employees = employeesData || [];
        this.products = productsData || [];
      })
      .catch(err => {
        console.error('Erro ao carregar dados:', err);
        this.snackBar.open('Erro ao carregar dados de vendas, clientes e funcionários', 'Fechar', {
          duration: 2000,
          panelClass: ['error-snackbar']
        });
      });
  }

  reloadSales(): void {
    this.http.get<any[]>(`${this.urlAPISales}`, { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.sales = data;
      },
      error: (err) => {
        console.error('Erro ao carregar vendas:', err);
        this.snackBar.open('Erro ao recarregar vendas.', 'Fechar', {
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
          this.reloadSales();
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

