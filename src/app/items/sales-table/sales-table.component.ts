import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";


import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sales-table',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    CurrencyPipe,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './sales-table.component.html',
  styleUrl: './sales-table.component.scss'
})
export class SalesTableComponent {
  @Input() data: any[] = [];
  @Output() onDeleteSale = new EventEmitter<string>();

  deleteSale(salesId: string): void {
    this.onDeleteSale.emit(salesId);
  }

}
