import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { IconBtnComponent } from '../../items/icon-btn/icon-btn.component';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    IconBtnComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  // URLs para APIs
  urlAPISales: string = 'https://tcc-ale-api.brazilsouth.cloudapp.azure.com/api/sales/';
  urlAPICustomers: string = 'https://tcc-ale-api.brazilsouth.cloudapp.azure.com/api/customers/';
  urlAPIProducts: string = 'https://tcc-ale-api.brazilsouth.cloudapp.azure.com/api/inventory/products/';
  urlAPIEmployees: string = 'https://tcc-ale-api.brazilsouth.cloudapp.azure.com/api/employees/';

  // Dados para o dashboard
  sales: any[] = [];
  clients: any[] = [];
  products: any[] = [];
  employees: any[] = [];
  
  // Dados de análise
  totalRevenue: number = 0;
  monthlySales: any[] = [];
  topProducts: any[] = [];
  newClients: number = 0;
  lowStockProducts: any[] = [];
  
  // Gráficos
  salesChart: any;
  productDistributionChart: any;
  clientGrowthChart: any;
  
  // Carregando estados
  isLoading: boolean = true;
  hasError: boolean = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }
  
  // Alternativa para loadDashboardData se não tiver endpoint unificado
loadDashboardData(): void {
  this.isLoading = true;
  
  // Promessas para todas as chamadas de API
  const salesPromise = this.http.get<any[]>(`${this.urlAPISales}`, { withCredentials: true }).toPromise();
  const clientsPromise = this.http.get<any[]>(`${this.urlAPICustomers}`, { withCredentials: true }).toPromise();
  const productsPromise = this.http.get<any[]>(`${this.urlAPIProducts}`, { withCredentials: true }).toPromise();
  const employeesPromise = this.http.get<any[]>(`${this.urlAPIEmployees}`, { withCredentials: true }).toPromise();
  
  // Processar todas as promessas em paralelo
  Promise.all([salesPromise, clientsPromise, productsPromise, employeesPromise])
    .then(([salesData, clientsData, productsData, employeesData]) => {
      this.sales = salesData || [];
      this.clients = clientsData || [];
      this.products = productsData || [];
      this.employees = employeesData || [];
      
      // Calcular métricas e inicializar gráficos
      this.calculateMetrics();
      this.initCharts();
      
      this.isLoading = false;
    })
    .catch(error => {
      console.error('Erro ao carregar dados do dashboard:', error);
      this.snackBar.open('Erro ao carregar dashboard. Verifique sua conexão.', 'Fechar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      this.isLoading = false;
      this.hasError = true;
    });
}
  
  calculateMetrics(): void {
    // Calcular receita total
    this.totalRevenue = this.sales.reduce((total, sale) => total + sale.total, 0);
    
    // Organizar vendas por mês
    const salesByMonth = new Map();
    const currentYear = new Date().getFullYear();
    
    this.sales.forEach(sale => {
      const saleDate = new Date(sale.date);
      if (saleDate.getFullYear() === currentYear) {
        const month = saleDate.getMonth();
        if (!salesByMonth.has(month)) {
          salesByMonth.set(month, 0);
        }
        salesByMonth.set(month, salesByMonth.get(month) + sale.total);
      }
    });
    
    // Converter para array para o gráfico
    this.monthlySales = Array.from({ length: 12 }, (_, i) => salesByMonth.get(i) || 0);
    
    // Top produtos (por quantidade vendida)
    const productSales = new Map();
    this.sales.forEach(sale => {
      sale.items.forEach((item: any) => {
        if (!productSales.has(item.product.id)) {
          productSales.set(item.product.id, {
            id: item.product.id,
            name: item.product.name,
            quantity: 0,
            revenue: 0
          });
        }
        const product = productSales.get(item.product.id);
        product.quantity += item.quantity;
        product.revenue += item.price * item.quantity;
      });
    });
    
    this.topProducts = Array.from(productSales.values())
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);
    
    // Novos clientes nos últimos 30 dias
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    this.newClients = this.clients.filter(client => 
      new Date(client.createdAt) >= thirtyDaysAgo
    ).length;
    
    // Produtos com estoque baixo
    this.lowStockProducts = this.products
      .filter(product => product.stock < product.minimumStock)
      .slice(0, 5);
  }
  
  initCharts(): void {
    // Limpar gráficos anteriores se existirem
    if (this.salesChart) this.salesChart.destroy();
    if (this.productDistributionChart) this.productDistributionChart.destroy();
    if (this.clientGrowthChart) this.clientGrowthChart.destroy();
    
    // Gráfico de vendas mensais
    const salesCtx = document.getElementById('salesChart') as HTMLCanvasElement;
    if (salesCtx) {
      this.salesChart = new Chart(salesCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          datasets: [{
            label: 'Vendas (R$)',
            data: this.monthlySales,
            backgroundColor: 'rgba(75, 192, 192, 0.7)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Vendas Mensais'
            },
            legend: {
              position: 'top',
            }
          }
        }
      });
    }
    
    // Gráfico de distribuição de produtos
    const topProductNames = this.topProducts.map(p => p.name);
    const topProductQuantities = this.topProducts.map(p => p.quantity);
    
    const productCtx = document.getElementById('productChart') as HTMLCanvasElement;
    if (productCtx) {
      this.productDistributionChart = new Chart(productCtx, {
        type: 'doughnut',
        data: {
          labels: topProductNames,
          datasets: [{
            data: topProductQuantities,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Top 5 Produtos Vendidos'
            },
            legend: {
              position: 'right',
            }
          }
        }
      });
    }
    
    // Tendência de clientes (últimos 6 meses)
    const clientGrowthCtx = document.getElementById('clientGrowthChart') as HTMLCanvasElement;
    if (clientGrowthCtx) {
      // Organize clients by month of creation
      const clientsByMonth = new Map();
      const now = new Date();
      
      // Initialize data for last 6 months
      for (let i = 5; i >= 0; i--) {
        const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
        clientsByMonth.set(month.getMonth() + '-' + month.getFullYear(), 0);
      }
      
      // Count clients by month
      this.clients.forEach(client => {
        const creationDate = new Date(client.createdAt);
        const monthKey = creationDate.getMonth() + '-' + creationDate.getFullYear();
        
        if (clientsByMonth.has(monthKey)) {
          clientsByMonth.set(monthKey, clientsByMonth.get(monthKey) + 1);
        }
      });
      
      // Get labels (month names)
      const monthLabels = Array.from(clientsByMonth.keys()).map(key => {
        const [month, year] = key.split('-');
        const date = new Date(parseInt(year), parseInt(month), 1);
        return date.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' });
      });
      
      this.clientGrowthChart = new Chart(clientGrowthCtx, {
        type: 'line',
        data: {
          labels: monthLabels,
          datasets: [{
            label: 'Novos Clientes',
            data: Array.from(clientsByMonth.values()),
            fill: true,
            borderColor: 'rgb(54, 162, 235)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Aquisição de Clientes'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              }
            }
          }
        }
      });
    }
  }
  
  refreshDashboard(): void {
    this.loadDashboardData();
    
    this.snackBar.open('Dashboard atualizado!', 'Fechar', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}