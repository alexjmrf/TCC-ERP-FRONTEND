import {Component, Input} from '@angular/core';
import {CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-sales-table',
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './sales-table.component.html',
  styleUrl: './sales-table.component.scss'
})
export class SalesTableComponent {
  @Input() data: any[] = [];
}
