import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {NgForOf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-sideMenu',
  templateUrl: './side-menu.component.html',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgForOf,
    NgOptimizedImage
  ],
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent {
  menuItems = [
    { label: 'Dashboard', icon: 'dashboard.svg', route: '/dashboard' },
    { label: 'Vendas', icon: 'sales.svg', route: '/sales' },
    { label: 'Produtos', icon: 'products.svg', route: '/products' },
    { label: 'Clientes', icon: 'clients.svg', route: '/clients' },
    { label: 'Funcionários', icon: 'employees.svg', route: '/employees' },
    { label: 'Finanças', icon: 'finances.svg', route: '/finances' },
    { label: 'Configurações', icon: 'configs.svg', route: '/settings' },
    { label: 'Ajuda', icon: 'help.svg', route: '/help' }
  ];
}
