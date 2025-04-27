import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SalesComponent } from './pages/sales/sales.component';
import { ProductsComponent } from './pages/products/products.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { FinancesComponent } from './pages/finances/finances.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
  // Home e login fora do MainLayout
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },

  // Rotas protegidas dentro do MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'sales', component: SalesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'finances', component: FinancesComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'help', component: HelpComponent }
    ]
  },

  // Wildcard para páginas não encontradas
  { path: '**', redirectTo: '' }
];
